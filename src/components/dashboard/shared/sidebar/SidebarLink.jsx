import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-slate-800 text-slate-200"
          : "text-slate-400",
        "flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-700 hover:no-underline active:bg-slate-600 rounded-sm text-base"
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default SidebarLink;
