import * as reactRouterDom  from "react-router-dom";
import { withPrefix } from "../utils/withPrefix";

export const Link: typeof reactRouterDom.Link = withPrefix(reactRouterDom.Link);
export const NavLink: typeof reactRouterDom.NavLink = withPrefix(reactRouterDom.NavLink);
export const Navigate: typeof reactRouterDom.Navigate = withPrefix(reactRouterDom.Navigate);
