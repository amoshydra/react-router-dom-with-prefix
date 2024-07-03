import { expect, it } from "vitest";
import { normalize } from "./normalizePathname";

it.each([
  ["/", "/"],
  ["//", "/"],
  ["/../", "/.."],
  ["/part-a/", "/part-a"],
  ["/part-a/", "/part-a"],
  ["/part-a/part-b/", "/part-a/part-b"],
  ["/part-a/#fragment/", "/part-a#fragment/"],
  ["/part-a/?query#fragment/", "/part-a?query#fragment/"],
  ["/part-a/?query=/", "/part-a?query=/"],
])("normalize %s into %s", (input, output) => {
  const normalized = normalize(input);
  expect(normalized).toBe(output);
});
