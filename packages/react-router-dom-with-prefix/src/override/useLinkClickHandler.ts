import * as reactRouterDom  from "react-router-dom";
import { usePrefix } from "../additional/PrefixedBrowserRouter";
import { patchTo } from "../utils/patchTo";

export const useLinkClickHandler: typeof reactRouterDom.useLinkClickHandler = (...props) => {
  const [to, ...rest] = props;
  const prefix = usePrefix({});
  const patchedTo = patchTo(to, prefix);

  return reactRouterDom.useLinkClickHandler(patchedTo, ...rest);
}
