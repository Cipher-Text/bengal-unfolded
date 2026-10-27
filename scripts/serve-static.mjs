import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".txt": "text/plain", ".xml": "application/xml", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon" };
createServer(async (request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end("Bad request"); return; }
  const clean = path.normalize(pathname).replace(/^([/\\]|\.\.(?:[/\\]|$))+/, "");
  let target = path.join(root, clean);
  try {
    if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
    const body = await readFile(target);
    response.writeHead(200, { "content-type": types[path.extname(target)] ?? "application/octet-stream" }).end(body);
  } catch {
    try { response.writeHead(404, { "content-type": "text/html; charset=utf-8" }).end(await readFile(path.join(root, "404.html"))); }
    catch { response.writeHead(404).end("Not found"); }
  }
}).listen(4173, "127.0.0.1");
