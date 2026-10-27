# Static container publishing and deployment

The site is exported by Next.js into `out/` and served by Nginx. The image contains no Node.js runtime. Publishing is downstream of the `Static site CI` workflow: it only runs for a successful push to `main`, then packages the static artifact from that same workflow run. Pull requests and failed or cancelled CI runs do not publish.

## Build and smoke test locally

Run the existing static checks and browser suite before building an image:

```sh
pnpm install --frozen-lockfile
pnpm run content:validate
pnpm run content:audit:figures
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
pnpm run static:verify
pnpm exec playwright test
```

Then run `scripts/smoke-test-container.sh`. It builds the Nginx image and checks Bengali and English routes, a Next static asset, legacy redirect status and destination, a missing route's 404 status, and the container health check. Docker must be available locally. To retain a named local image, pass it as the script's first argument.

The production Compose template intentionally has no `ports` or `expose` mapping. The existing shared reverse proxy must connect to the service over the external `internal_apps` Docker network and route the desired hostname to `bengal-unfolded:80`.

## GHCR permissions and visibility

The publishing workflow uses the repository `GITHUB_TOKEN` with `contents: read`, `actions: read`, and `packages: write`; job-level permissions are limited to the artifact download, checkout, and package publish needs. No personal access token or production credential is required.

On first publication, verify the package under the repository owner's GitHub Packages. Set package visibility to **private** for a private production deployment, and grant the production host's image-pull identity access. A public package can be pulled without authentication; choose that only if public image access is intended. If organization policy blocks Actions from creating linked packages, pre-create the package and grant the repository Actions access.

Published image names use the lowercase repository path:

```text
ghcr.io/<owner>/bengal-unfolded:<full-git-sha>
```

The full source SHA is the immutable deployment reference. Before building, the workflow checks GHCR for that SHA and skips a duplicate publish if the tag already exists. It reports the image digest and local Docker image size in the Actions log. It does not publish a mutable `latest` tag.

## Production prerequisites

- Ubuntu host with Docker Engine and the Compose plugin already installed.
- Shared Nginx reverse proxy and app attached to the existing external `internal_apps` network.
- GHCR pull credentials on the host when the package is private.
- Reverse proxy upstream configured for `bengal-unfolded:80`; TLS and external ingress stay at the shared proxy.
- The proxy must preserve the original `Host` when the `www.bengalunfolded.com` redirect is expected from this container. Otherwise configure that canonical-host redirect at the shared proxy.
- A chosen immutable image tag from a successful `main` CI run.

The container itself publishes no host port. It is read-only with temporary writable Nginx cache/runtime directories. Before the first deployment, confirm the host's external network is named `internal_apps`; Compose will not create or alter it.

## Deploy and roll back

On the production host, set the exact validated tag and start the service:

```sh
export BENGAL_UNFOLDED_IMAGE=ghcr.io/<owner>/bengal-unfolded:<full-git-sha>
docker compose -f compose.production.yaml pull
docker compose -f compose.production.yaml up -d
```

Check `docker compose -f compose.production.yaml ps` and inspect the shared proxy's application health route. Keep the previous working SHA available. To roll back, set `BENGAL_UNFOLDED_IMAGE` to that previous SHA, then run the same `pull` and `up -d` commands. This changes only the Bengal Unfolded Compose service; the template does not modify or recreate the shared proxy.

No VM deployment is performed by the CI workflow. It only publishes the image to GHCR.
