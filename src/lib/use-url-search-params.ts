"use client";

import { useEffect, useState } from "react";

/** Search state for statically exported pages, including the first direct-query load. */
export function useUrlSearchParams(): URLSearchParams {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const sync = () => setQuery(window.location.search.slice(1));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return new URLSearchParams(query);
}

export function pushSearchParams(pathname: string, params: URLSearchParams): void {
  window.history.pushState(null, "", `${pathname}${params.size ? `?${params}` : ""}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

/** Like pushSearchParams but without adding a history entry; for live typing. */
export function replaceSearchParams(pathname: string, params: URLSearchParams): void {
  window.history.replaceState(null, "", `${pathname}${params.size ? `?${params}` : ""}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
