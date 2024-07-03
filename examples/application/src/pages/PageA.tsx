import { PrefixedBrowserRouter, Route, Routes } from "react-router-dom-with-prefix";
import NavigationBar from "../components/NavigationBar";

export interface PageAProps {
  basename: string;
}

export default function PageA({ basename }: PageAProps) {
  return (
    <PrefixedBrowserRouter basename={basename}>
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
          ]}
        />
        <Routes>
          <Route path="/nested-1" element={<div className="page">Nested 1</div>} />
          <Route path="/nested-2" element={<div className="page">Nested 2</div>} />
        </Routes>
      </div>
    </PrefixedBrowserRouter>
  );
}
