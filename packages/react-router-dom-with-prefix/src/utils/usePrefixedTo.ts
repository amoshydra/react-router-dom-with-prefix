import * as reactRouterDom  from "react-router-dom";
import { usePrefix } from "../additional/PrefixedBrowserRouter";
import { patchTo } from "./patchTo";

export const usePrefixedTo = (to: reactRouterDom.To) => {
  const prefix = usePrefix({});
  return patchTo(to, prefix);
};
