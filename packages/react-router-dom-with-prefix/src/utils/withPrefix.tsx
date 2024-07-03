import { To } from "react-router-dom";
import { usePrefixedTo } from "../utils/usePrefixedTo";
import { ReactNode, createElement, forwardRef } from "react";

export const withPrefix = <P extends { to: To }, E extends ReactNode, C extends (props: P) => E>(Comp: C): C => {
  return forwardRef<unknown, P>((props, ref) => {
    const prefixedTo = usePrefixedTo(props.to);
    const to = props.to == null ? props.to : prefixedTo;
    return createElement(Comp, {
      ref,
      ...props,
      to,
    })
  }) as unknown as C
};
