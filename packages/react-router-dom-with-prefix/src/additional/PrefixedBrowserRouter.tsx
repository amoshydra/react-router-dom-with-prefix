import { ReactNode, createContext, useContext } from "react";
import { normalizeSlash } from "../utils/normalizePathname";

export interface PrefixedContextProps {
  basename?: string;
}

export interface PrefixedBrowserRouterProps extends PrefixedContextProps {
  children?: ReactNode;
}

const prefixedContext = createContext<PrefixedContextProps>({
  basename: undefined,
})

export const usePrefix = (props: PrefixedContextProps): string => {
  const parentalContext = useContext(prefixedContext);
  const basename = [parentalContext?.basename, props.basename]
    .filter(s => s != null)
    .join("")
  ;
  return normalizeSlash(basename);
};

export const PrefixedBrowserRouter = (props: PrefixedBrowserRouterProps) => {
  const basename = usePrefix(props);
  return (
    <prefixedContext.Provider value={{ basename }}>
      {props.children}
    </prefixedContext.Provider>
  )
};
