import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
