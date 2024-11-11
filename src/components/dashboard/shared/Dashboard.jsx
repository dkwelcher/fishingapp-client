import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSideBarButton from "./MobileSidebarButton.jsx";

function Dashboard({ setUser, screenWidth }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* 
  The useEffect listens for mouse clicks outside of the specified dropdown component, and it will close the dropdown if such a click is detected.

  @return Cleanup function that removes mousedown event listener when component unmounts.
  */
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      let targetElement = event.target;
      let isInsideDropdown = false;

      while (targetElement != null) {
        if (targetElement === dropdownRef.current) {
          isInsideDropdown = true;
          break;
        }
        targetElement = targetElement.parentNode;
      }

      if (!isInsideDropdown) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <div className="flex flex-row bg-slate-100 h-screen w-screen overflow-hidden">
      <div>
        <MobileSideBarButton
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="invisible absolute md:visible md:static">
        {screenWidth >= 768 && (
          <Sidebar setUser={setUser} screenWidth={screenWidth} />
        )}
      </div>
      <div className={`z-40 h-full ${screenWidth < 768 ? "" : "hidden"}`}>
        <div
          ref={dropdownRef}
          className={`z-30 transition-all duration-700 ease-in-out ${
            isSidebarOpen && screenWidth < 768
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          <Sidebar setUser={setUser} screenWidth={screenWidth} />
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-auto">
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Dashboard;
