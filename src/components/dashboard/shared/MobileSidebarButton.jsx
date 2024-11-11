import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function MobileSideBarButton({ isSidebarOpen, setIsSidebarOpen }) {
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <button
      className={`absolute w-full p-2 text-3xl text-slate-200 z-50 md:invisible ${
        !isSidebarOpen && "bg-transparent-shadow"
      }`}
      onClick={() => {
        toggleSidebar();
      }}
    >
      {isSidebarOpen ? <RxCross1 /> : <RxHamburgerMenu />}
    </button>
  );
}

export default MobileSideBarButton;
