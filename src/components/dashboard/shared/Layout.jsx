import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function Layout({ setUser, screenWidth }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

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
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  /* Tailwind Class Styles */
  const pageStyles =
    "flex flex-row bg-slate-100 h-screen w-screen overflow-hidden";
  const viewStyles = "flex flex-col flex-1 overflow-auto";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div>
        <button
          className={`absolute w-full p-2 text-3xl text-slate-200 z-50 md:invisible ${
            !isOpen && "bg-transparent-shadow"
          }`}
          onClick={() => {
            toggleNavbar();
          }}
        >
          {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
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
            isOpen && screenWidth < 768
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          <Sidebar setUser={setUser} screenWidth={screenWidth} />
        </div>
      </div>
      <div className={viewStyles}>
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
