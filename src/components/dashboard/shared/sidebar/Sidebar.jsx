import { useContext } from "react";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../../../lib/constants/index";
import Logo from "./SidebarLogo.jsx";
import SidebarLink from "./SidebarLink.jsx";
import LogoutLink from "./SidebarLogoutLink.jsx";
import { ScreenWidthContext } from "../../../../lib/context/Context.jsx";

function Sidebar() {
  const screenWidth = useContext(ScreenWidthContext);
  return (
    <div
      className={`pt-10 h-full bg-slate-950 w-60 p-3 flex flex-col border-r border-slate-700 md:pt-0 ${
        screenWidth < 768 && "absolute z-40"
      }`}
    >
      <Logo />
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-slate-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <LogoutLink />
      </div>
    </div>
  );
}

export default Sidebar;
