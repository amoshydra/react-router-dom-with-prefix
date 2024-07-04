import * as reactRouterDom  from "react-router-dom";
import { usePrefix } from "../additional/PrefixedBrowserRouter";
import { patchTo } from "../utils/patchTo";

export const createPath: typeof reactRouterDom.createPath = (...props) => {
  const [options, ...rest] = props;
  const prefix = usePrefix({});
  const patchedTo = patchTo(options, prefix);

  return reactRouterDom.createPath(patchedTo, ...rest);
}
