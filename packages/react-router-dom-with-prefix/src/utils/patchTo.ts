import { Path, To } from "react-router-dom";
import { normalize } from "./normalizePathname";

const patchPathname = (pathname: string, prefix: string) => normalize(prefix + pathname);

export const patchTo = <T extends To>(to: T, prefix: string): T extends string ? string : Partial<Path> => {
  if (typeof to === "string") {
    return patchPathname(to, prefix);
  }

  return {
    ...to,
    pathname: patchPathname(to.pathname || "", prefix)
  };
}
