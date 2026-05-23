"use client";

import { useState, useSyncExternalStore } from "react";
import { absoluteUrl } from "@/lib/seo";

type ShareActionsLabels = {
  share: string;
  copyLink: string;
  copied: string;
  copyFailed: string;
};

type ShareActionsProps = {
  title: string;
  path: string;
  labels: ShareActionsLabels;
};

export function ShareActions({ title, path, labels }: ShareActionsProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const url = absoluteUrl(path);
  const canNativeShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  async function handleNativeShare() {
    if (!canNativeShare) return;
    try {
      await navigator.share({ title, url });
    } catch {
      // User cancellation should not show an error state.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:justify-end">
      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/35 px-3 text-sm text-accent hover:bg-amber-500/10"
          aria-label={labels.share}
        >
          {labels.share}
        </button>
      ) : null}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/35 px-3 text-sm text-accent hover:bg-amber-500/10"
        aria-label={labels.copyLink}
      >
        {labels.copyLink}
      </button>
      {status === "copied" ? <span className="text-xs text-emerald-300">{labels.copied}</span> : null}
      {status === "failed" ? <span className="text-xs text-rose-300">{labels.copyFailed}</span> : null}
    </div>
  );
}
