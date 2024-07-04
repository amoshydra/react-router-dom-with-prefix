import * as reactRouterDom  from "react-router-dom";
import { usePrefix } from "../additional/PrefixedBrowserRouter";
import { patchTo } from "./patchTo";

export const usePrefixedTo = <T extends reactRouterDom.To>(to: T) => {
  const prefix = usePrefix({});
  return patchTo<T>(to, prefix);
};
