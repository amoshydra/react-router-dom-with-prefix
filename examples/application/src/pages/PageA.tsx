import { Link, Navigate, PrefixedBrowserRouter, Route, Routes } from "react-router-dom-with-prefix";
import NavigationBar from "../components/NavigationBar";

export interface PageAProps {
  basename: string;
}

export default function PageA({ basename }: PageAProps) {
  return (
    <PrefixedBrowserRouter basename={basename}>
      <h2>Page A</h2>
      <div className="page">
        <NavigationBar
          navButtons={[
            {
              navigationPath: "/nested-1",
              children: "Nested 1",
            },
            {
              navigationPath: "/nested-2",
              children: "Nested 2",
            },
            {
              navigationPath: "/nested-3",
              children: "Redirect to 1",
            },
          ]}
        />
        <Routes>
          <Route
            path="/nested-1"
            element={
              <div className="page">
                <div>
                  <h3>Nested 1</h3>
                  <Link to={{ pathname: "/nested-2" }}>Next</Link>
                </div>
              </div>
            }
          />
          <Route
            path="/nested-2"
            element={
              <div className="page">
                <div>
                  <h3>Nested 2</h3>
                  <Link to="/nested-1">Previous</Link>
                </div>
              </div>
            }
          />
          <Route
            path="/nested-3"
            element={
              <div className="page">
                <div>
                  <h3>Redirect to 1</h3>
                  <Navigate to={"/nested-1"} />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </PrefixedBrowserRouter>
  );
}
