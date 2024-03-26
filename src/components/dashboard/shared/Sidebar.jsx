/* 
Sidebar.jsx is component that displays the sidebar with links that navigate through the dashboard.

@since 2024-02-22
*/

import Logo from "../../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../../lib/constants/index";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";

/* Tailwind Class Styles */
const sidebarLinkStyles =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-700 hover:no-underline active:bg-slate-600 rounded-sm text-base";
const sidebarLinkIconStyles = "text-xl";
/* End Tailwind Class Styles */

/* 
Sidebar renders the dashboard sidebar with text, styling, & Links to views within the dashboard.

@param setUser Setter function that sets the user state.
@param screenWidth Integer the holds value of user device's screen width.
@return HTML rendering the sidebar & sidebar links to dashboard views.
*/
function Sidebar({ setUser, screenWidth }) {
  // function that changes page without browser refresh.
  const navigate = useNavigate();

  /* 
  handleLogout removes user & token data from localStorage, sets user state to undefined, &
  navigates the user back to the landing page.
  */
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser({});
    navigate("/");
  }

  /* Function Tailwind Class Styles */
  const sidebarLogoContainerStyles = "flex items-center gap-2 px-1 py-3";
  const sidebarLogoImageStyles = "size-10";
  const sidebarLogoNameStyles = "text-slate-200 text-3xl font-cursive";
  const sidebarLinkContainerStyles = "flex-1 py-8 flex flex-col gap-0.5";
  const sidebarBottomLinkContainerStyles =
    "flex flex-col gap-0.5 pt-2 border-t border-slate-700";
  const sidebarLogoutLinkStyles = "text-red-600 cursor-pointer";
  const sidebarLogoutIconStyles = "text-xl";
  /* End Function Tailwind Class Styles */

  return (
    <div
      className={`pt-10 h-full bg-slate-950 w-60 p-3 flex flex-col border-r border-slate-700 md:pt-0 ${
        screenWidth < 768 && "absolute z-40"
      }`}
    >
      <div className={sidebarLogoContainerStyles}>
        <img className={sidebarLogoImageStyles} src={Logo} />
        <span className={sidebarLogoNameStyles}>Fishing App</span>
      </div>
      <div className={sidebarLinkContainerStyles}>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className={sidebarBottomLinkContainerStyles}>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames(sidebarLogoutLinkStyles, sidebarLinkStyles)}
          onClick={handleLogout}
        >
          <span className={sidebarLogoutIconStyles}>{<HiOutlineLogout />}</span>
          Logout
        </div>
      </div>
    </div>
  );
}

/* 
SidebarLink is an inner component that dynamically renders sidebar links with styling, icons, text, &
the path to the corresponding view.

@param item Object that stores data corresponding to sidebar links.
@return A Link component with data corresponding to a specific sidebar link from index.jsx.
*/
function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-slate-800 text-slate-200"
          : "text-slate-400",
        sidebarLinkStyles
      )}
    >
      <span className={sidebarLinkIconStyles}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
