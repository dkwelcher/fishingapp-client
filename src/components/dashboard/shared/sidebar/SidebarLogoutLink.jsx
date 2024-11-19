import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { AuthContext } from "../../../../lib/context/Context.jsx";

function SidebarLogoutLink() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser({});
    navigate("/");
  }
  return (
    <div
      className="text-red-600 cursor-pointer flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-700 hover:no-underline active:bg-slate-600 rounded-sm text-base"
      onClick={handleLogout}
    >
      <span className="text-xl">{<HiOutlineLogout />}</span>
      Logout
    </div>
  );
}

export default SidebarLogoutLink;
