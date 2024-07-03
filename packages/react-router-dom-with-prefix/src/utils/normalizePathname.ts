const restore = (values: string[], delimeter: string) => {
  const joined = values.join(delimeter);
  return joined ? `${delimeter}${joined}` : "";
}

export const normalizeSlash = (pathname: string) => {
  return (
    pathname
      .replace(/\/+/g, "/") // remove duplicated slashed
      .replace(/([^/])\/$/, "$1") // remove trailing slash
  );
}

/**
 * remove double slashs and trailing slash
 */
export const normalize = (pathname: string) => {
  const [pathAndQuery, ...unnormalizedFragments] = pathname.split("#");
  const fragment = restore(unnormalizedFragments, "#");

  const [path, ...unnormalizedQuery] = pathAndQuery.split("?");
  const query = restore(unnormalizedQuery, "?");

  return (
    normalizeSlash(path)
    + query
    + fragment
  );
};
