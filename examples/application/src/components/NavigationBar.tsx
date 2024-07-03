import { ReactNode } from "react";
import { useNavigate } from "react-router-dom-with-prefix"

export interface NavigationBarProps {
  navButtons: {
    children: ReactNode;
    navigationPath: string;
  }[]
}

export default function NavigationBar(props: NavigationBarProps) {
  const navigate = useNavigate();

  return (
    <nav>
      {
        props.navButtons.map(({ children, navigationPath }) => (
          <button
            onClick={() => navigate(navigationPath)}
            key={navigationPath}
          >{children}</button>
        ))
      }
    </nav>
  );
}