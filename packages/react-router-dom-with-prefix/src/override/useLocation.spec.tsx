import { expect, it, describe } from "vitest";
import { useLocation } from "./useLocation.ts";
import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PrefixedBrowserRouter } from "../additional/PrefixedBrowserRouter.tsx";
import { setEnvironmentPathName } from "../__helpers__/setEnvironmentPathName.ts";

const defaultOutput = {
  pathname: "/",
  hash: "",
  key: "default",
  search: "",
  state: null,
}

describe("should work like a react-router-dom\'s useLocation", () => {
  it.each([
    ["/", {
      pathname: "/",
    }],
    ["/level-1", {
      pathname: "/level-1",
    }],
    ["/level-1/level-2", {
      pathname: "/level-1/level-2",
    }],
    ["/level-1/level-2?query=1", {
      pathname: "/level-1/level-2",
      search: "?query=1"
    }],
    ["/level-1/level-2?", {
      pathname: "/level-1/level-2",
      search: ""
    }],
    ["/level-1/level-2#fragment", {
      pathname: "/level-1/level-2",
      search: "",
      hash: "#fragment"
    }],
    ["/level-1/level-2#", {
      pathname: "/level-1/level-2",
      search: "",
      hash: ""
    }],
    ["/level-1/level-2?#", {
      pathname: "/level-1/level-2",
      search: "",
      hash: ""
    }],
    ["/level-1/level-2?query=1#", {
      pathname: "/level-1/level-2",
      search: "?query=1",
      hash: ""
    }],
  ])('%s', (url, output) => {
    setEnvironmentPathName(url);

    const { result } = renderHook(() => useLocation(), { wrapper: BrowserRouter });
    expect(result.current).toEqual({ ...defaultOutput, ...output });
  });

  describe("remove prefix from ancenstral PrefixedBrowserRouter", () => {
    it("should work with repeatedly nested '/' basename", () => {
      setEnvironmentPathName("/");

      const { result } = renderHook(
        useLocation,
        {
          wrapper: ({ children }) => (
            <BrowserRouter basename="/">
              <PrefixedBrowserRouter basename="/">
                {children}
              </PrefixedBrowserRouter>
            </BrowserRouter>
          ),
        },
      );

      expect(result.current).toEqual({
        ...defaultOutput,
        pathname: "/",
      });
    });

    it("should work with BrowserRouter with a given basename", () => {
      setEnvironmentPathName("/browser-router-prefix");
      const { result } = renderHook(
        useLocation,
        {
          wrapper: ({ children }) => (
            <BrowserRouter basename="/browser-router-prefix">
              <PrefixedBrowserRouter basename="/">
                {children}
              </PrefixedBrowserRouter>
            </BrowserRouter>
          ),
        },
      );

      expect(result.current).toEqual({
        ...defaultOutput,
        pathname: "/",
      });
    });

    it("should work with prefix from PrefixdBrowserRouter", () => {
      setEnvironmentPathName("/browser-router-prefix/prefix-2/path-after-prefix");
      const { result } = renderHook(
        useLocation,
        {
          wrapper: ({ children }) => (
            <BrowserRouter basename="/browser-router-prefix">
              <PrefixedBrowserRouter basename="/prefix-2">
                {children}
              </PrefixedBrowserRouter>
            </BrowserRouter>
          ),
        },
      );

      expect(result.current).toEqual({
        ...defaultOutput,
        pathname: "/path-after-prefix",
      });
    });

    it("should throw error if current location.pathname doesn't match with given prefix", () => {
      setEnvironmentPathName("/browser-router-prefix/prefix-2/path-after-prefix");

      expect.assertions(1);
      renderHook(
        () => {
          try {
            useLocation();
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
          }
        },
        {
          wrapper: ({ children }) => (
            <BrowserRouter basename="/browser-router-prefix">
              <PrefixedBrowserRouter basename="/prefix-2">
                <PrefixedBrowserRouter basename="/prefix-3">
                  {children}
                </PrefixedBrowserRouter>
              </PrefixedBrowserRouter>
            </BrowserRouter>
          ),
        },
      );

    });
  });
});
