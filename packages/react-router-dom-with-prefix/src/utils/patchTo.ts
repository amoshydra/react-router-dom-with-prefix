import { To } from "react-router-dom";
import { normalize } from "./normalizePathname";

export const patchTo = (to: To, prefix: string) => {
  const patchPathname = (pathname: string) => normalize(prefix + pathname);

  if (typeof to === "string") {
    return patchPathname(to);
  }

  return {
    ...to,
    pathname: patchPathname(to.pathname || "")
  };
}
