import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-col flex-1 overflow-auto">
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
