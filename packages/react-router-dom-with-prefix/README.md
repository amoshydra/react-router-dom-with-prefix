# React Router DOM with Prefix

A drop-in replacement for `react-router-dom` that provides nested prefix routing.

```diff
 import {
+  PrefixedBrowserRouter,
   BrowserRouter,
   Routes,
   Route,
-} from "react-router-dom";
+} from "react-router-dom-with-prefix";
```

## `PrefixedBrowserRouter`

```tsx
<BrowserRouter basename="/prefix-1">
  <Routes>
    <Route path="/" element={<Outlet />}>
      <Route
        path="/prefix-a/*"
        element={
          <PrefixedBrowserRouter basename="/prefix-a">
            <Routes>
              {/* navigation inside PrefixedBrowserRouter are prefixed with "/prefix-a" */}
              <Route path="/nested-1" element={<Link to="/nested-2">Go 2</Link>} />
              <Route path="/nested-2" element={<Link to="/nested-1">Go 1</Link>} />
            </Routes>
          </PrefixedBrowserRouter>
        }
      />
      <Route path="/prefix-b" element={<PageB />} />
    </Route>
  </Routes>
</BrowserRouter>
```

## Augmentation to `react-router-dom` exports

The following exports are augmented with prefix awared logic

1. [x] `createPath`
1. [ ] `useBlocker`
1. [x] `useHref`
1. [x] `useLinkClickHandler`
1. [x] `useLocation`
1. [ ] `useMatch`
1. [x] `useNavigate`
1. [ ] `useResolvedPath`
1. [ ] `useRoutes`

## Components

1. [x] `Link`
1. [x] `NavLink`
1. [x] `Navigate`

#### Related to Data Router
1. [ ] `useMatches`
1. [ ] `useSubmit`

## Motivation

Nesting of BrowserRouter is no longer support since v6.

## Not patched
The following known exports are not augmented

### Not needed

#### These function is not related to basename
1. `useNavigationType`
1. `generatePath`
1. `matchPath`
1. `matchRoutes`
1. `parsePath`
1. `useRevalidator`
1. `useParams`
1. `resolvePath`
1. `useBeforeUnload`
1. `useInRouterContext`
1. `useOutlet`
1. `useOutletContext`
1. `useSearchParams`

##### Data router hooks
1. `useActionData`
1. `useNavigation`
1. `useLoaderData`
1. `useRouteLoaderData`
1. `useRouteError`

#### Related to data fetching
1. `useFetcher`
1. `useFetchers`
1. `useFormAction`

#### Related to Await
1. `Await`
1. `useAsyncError`
1. `useAsyncValue`

### Unknown
1. `redirect`
1. `redirectDocument`
1. `renderMatches`
