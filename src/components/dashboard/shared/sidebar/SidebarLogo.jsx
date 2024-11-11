import Logo from "../../../../assets/logo.png";

function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-1 py-3">
      <img className="size-10" src={Logo} />
      <span className="text-slate-200 text-3xl font-cursive">Fishing App</span>
    </div>
  );
}

export default SidebarLogo;
