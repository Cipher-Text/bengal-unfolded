"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

/** Search state for statically exported pages, including the first direct-query load. */
export function useUrlSearchParams(): URLSearchParams {
  const nextParams = useSearchParams();
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);
  return new URLSearchParams(search || nextParams.toString());
}

export function pushSearchParams(pathname: string, params: URLSearchParams): void {
  window.history.pushState(null, "", `${pathname}${params.size ? `?${params}` : ""}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
