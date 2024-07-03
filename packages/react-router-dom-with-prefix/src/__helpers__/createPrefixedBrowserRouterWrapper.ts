import { ComponentType, ElementType, ReactNode, createElement } from "react";
import { PrefixedBrowserRouter } from "../additional/PrefixedBrowserRouter.tsx";

export const createWrapperFromStrings = (basenames: string[]) => (
  basenames
    .slice(0)
    .reverse()
    .reduce((acc, basename) => (
      createWrapper(basename, acc)
    ), undefined as undefined | ElementType)
) as ComponentType;

export const createWrapper = (basename: string, wrapper: ElementType = "div") => ({ children }: { children?: ReactNode }) => (
  createElement(
    PrefixedBrowserRouter,
    { basename },
    createElement(wrapper, {}, children)
  )
);
