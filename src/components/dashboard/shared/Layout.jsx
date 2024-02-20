import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout({ setUser }) {
  /* Tailwind Class Styles */
  const pageStyles =
    "flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden";
  const viewStyles = "flex-col flex-1 overflow-auto";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <Sidebar setUser={setUser} />
      <div className={viewStyles}>
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
