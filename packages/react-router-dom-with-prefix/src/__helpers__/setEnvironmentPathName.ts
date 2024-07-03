export const setEnvironmentPathName = (pathname: string) =>
  history.pushState(null, "", new URL(pathname, location.origin))
;