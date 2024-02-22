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
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
const sidebarLinkIconStyles = "text-xl";
/* End Tailwind Class Styles */

function Sidebar({ setUser, screenWidth }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser({});
    navigate("/");
  }

  /* Function Tailwind Class Styles */
  const sidebarContainerStyles =
    "bg-neutral-900 w-60 p-3 flex flex-col text-white border-r border-neutral-700";
  const sidebarLogoContainerStyles = "flex items-center gap-2 px-1 py-3";
  const sidebarLogoImageStyles = "size-10";
  const sidebarLogoNameStyles = "text-neutral-100 text-3xl font-cursive";
  const sidebarLinkContainerStyles = "flex-1 py-8 flex flex-col gap-0.5";
  const sidebarBottomLinkContainerStyles =
    "flex flex-col gap-0.5 pt-2 border-t border-neutral-700";
  const sidebarLogoutLinkStyles = "text-red-500 cursor-pointer";
  const sidebarLogoutIconStyles = "text-xl";
  /* End Function Tailwind Class Styles */

  return (
    <div
      className={`pt-10 h-full bg-neutral-900 w-60 p-3 flex flex-col text-white border-r border-neutral-700 sm:pt-0 ${
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

function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? " bg-neutral-700 text-white"
          : "text-neutral-400",
        sidebarLinkStyles
      )}
    >
      <span className={sidebarLinkIconStyles}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
