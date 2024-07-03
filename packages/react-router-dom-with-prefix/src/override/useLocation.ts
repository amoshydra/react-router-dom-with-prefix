import * as reactRouterDom  from "react-router-dom";
import { usePrefix } from "../additional/PrefixedBrowserRouter";
import { normalizeSlash } from "../utils/normalizePathname";

export const useLocation: typeof reactRouterDom.useLocation = (...props) => {
  const { pathname, ...rest } = reactRouterDom.useLocation(...props);
  const prefix = usePrefix({})

  if (!pathname.startsWith(prefix)) {
    throw new Error("current pathnaem does not start with the given basename");
  }

  return {
    pathname: normalizeSlash('/' + pathname.substring(prefix.length)),
    ...rest,
  };
}
