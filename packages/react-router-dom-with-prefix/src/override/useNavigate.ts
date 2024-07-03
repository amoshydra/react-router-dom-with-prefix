import * as reactRouterDom  from "react-router-dom";
import { usePrefix } from "../additional/PrefixedBrowserRouter";
import { normalize } from "../utils/normalizePathname";

const patchTo = (to: reactRouterDom.To, prefix: string) => {
  const patchPathname = (pathname: string) => normalize(prefix + pathname);

  if (typeof to === "string") {
    return patchPathname(to);
  }

  return {
    ...to,
    pathname: patchPathname(to.pathname || "")
  };
}

export const useNavigate: typeof reactRouterDom.useNavigate = (...props) => {
  const navigate = reactRouterDom.useNavigate(...props);
  const prefix = usePrefix({})

  const navigateFunction: reactRouterDom.NavigateFunction = ((...args: [delta: number] | [to: reactRouterDom.To, options?: reactRouterDom.NavigateOptions]) => {
    const toOrDelta = args[0];
    const options = args[1];
    const hasOptions = args.length === 2;

    if (typeof toOrDelta === 'number') {
      return navigate(toOrDelta);
    }

    const patchedTo = patchTo(toOrDelta, prefix);
    if (hasOptions) {
      return navigate(patchedTo, options);
    }
    return navigate(patchedTo);
  });

  return navigateFunction;
}
