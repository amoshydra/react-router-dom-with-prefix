import { expect, it, describe } from "vitest";
import { usePrefix } from "./PrefixedBrowserRouter.tsx";
import { renderHook } from "@testing-library/react";
import { createWrapperFromStrings } from "../__helpers__/createPrefixedBrowserRouterWrapper.ts";

describe("should return the given basename when used without a context", () => {
  it.each([
    '/',
    '/part-1',
    '/part-1/part-2',
  ])('basename: \'%s\'', (basename) => {
    const { result } = renderHook(() => usePrefix({ basename }));
    expect(result.current).toBe(basename);
  });
});

describe("should return the given basename when used without a context", () => {
  it.each([
    {
      output: "/",
      wrapper: ["/"],
      props: { basename: "/" },
    },
    {
      output: "/level-1",
      wrapper: ["/level-1"],
      props: { basename: "/" },
    },
    {
      output: "/level-1/level-2",
      wrapper: ["/level-1"],
      props: { basename: "/level-2" },
    },
    {
      output: "/level-1/level-2",
      wrapper: ["/level-1", "/level-2"],
      props: { basename: "/" },
    },
    {
      output: "/level-1/level-2/level-3",
      wrapper: ["/level-1", "/level-2"],
      props: { basename: "/level-3" },
    },
  ])('$output from wrapper: $wrapper and basename: $props.basename', ({ output, wrapper, props }) => {
    const { result } = renderHook(() => usePrefix(props), { wrapper: createWrapperFromStrings(wrapper) });
    expect(result.current).toBe(output);
  });
});
