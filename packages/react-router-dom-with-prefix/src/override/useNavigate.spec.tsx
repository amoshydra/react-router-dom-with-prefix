import { expect, it, describe, vi, beforeEach } from "vitest";
import { useNavigate } from "./useNavigate.ts";
import { renderHook } from "@testing-library/react";
import { BrowserRouter, NavigateOptions } from "react-router-dom";
import { PrefixedBrowserRouter } from "../additional/PrefixedBrowserRouter.tsx";
import { setEnvironmentPathName } from "../__helpers__/setEnvironmentPathName.ts";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => ({
  ...await importOriginal<typeof import('react-router-dom')>(),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  vi.clearAllMocks();
  setEnvironmentPathName("/");
});

describe("should passthrough argument to react-router-dom's useNavigate when used with BrowserRouter", () => {
  it("arugment as delta", () => {
    const { result } = renderHook(useNavigate, { wrapper: BrowserRouter });

    result.current(0);

    expect(mockedNavigate).toBeCalledWith(0);
  });

  it("argument as string", () => {
    const { result } = renderHook(useNavigate, { wrapper: BrowserRouter });

    result.current("/next-path?query=1#fragment");

    expect(mockedNavigate).toBeCalledWith("/next-path?query=1#fragment");
  });

  const options: NavigateOptions = {
    preventScrollReset: true,
    relative: "route",
    replace: true,
    state: {},
    unstable_flushSync: false,
    unstable_viewTransition: false,
  };

  it("argument as string with options", () => {
    const { result } = renderHook(useNavigate, { wrapper: BrowserRouter });

    result.current("/next-path?query=1#fragment", options);

    expect(mockedNavigate).toBeCalledWith("/next-path?query=1#fragment", options);
  });

  it("argument as object To", () => {
    const { result } = renderHook(useNavigate, { wrapper: BrowserRouter });

    result.current({
      pathname: "/next-path",
      hash: "#fragment",
      search: "?query=1",
    });

    expect(mockedNavigate).toBeCalledWith({
      pathname: "/next-path",
      hash: "#fragment",
      search: "?query=1",
    });
  });

  it("argument as object To with options", () => {
    const { result } = renderHook(useNavigate, { wrapper: BrowserRouter });

    result.current(
      {
        pathname: "/next-path",
        hash: "#fragment",
        search: "?query=1",
      },
      options,
    );

    expect(mockedNavigate).toBeCalledWith(
      {
        pathname: "/next-path",
        hash: "#fragment",
        search: "?query=1",
      },
      options,
    );
  });
});

describe("should prefix basename provided into PrefixedBrowserRouter", () => {
  beforeEach(() => {
    setEnvironmentPathName("/browser-router-prefix");
  });

  it.each(
    [
      {
        label: "delta",
        input: [0],
        output: [0],
      },
      {
        label: "string pathanem",
        input: ["/"],
        output: ["/prefix-2/prefix-3"],
      },
      {
        label: "string pathanem",
        input: ["/destination-a"],
        output: ["/prefix-2/prefix-3/destination-a"],
      },
    ] as const
  )("$label - $output", ({ input, output }) => {
    const { result } = renderHook(useNavigate, {
      wrapper: ({ children }) => (
        <BrowserRouter basename="/browser-router-prefix">
          <PrefixedBrowserRouter basename="/prefix-2">
            <PrefixedBrowserRouter basename="/prefix-3">
              {children}
            </PrefixedBrowserRouter>
          </PrefixedBrowserRouter>
        </BrowserRouter>
      )
    });

    result.current(...input);

    expect(mockedNavigate).toBeCalledWith(...output);
  });
});
