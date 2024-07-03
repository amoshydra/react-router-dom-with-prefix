import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom-with-prefix";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter basename="/">
      <NavigationBar
        navButtons={[
          {
            navigationPath: "/pages/a",
            children: "Page A",
          },
          {
            navigationPath: "/pages/b",
            children: "Page B",
          },
        ]}
      />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/pages/a" element={<PageA />} />
          <Route path="/pages/b" element={<PageB />} />
          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
