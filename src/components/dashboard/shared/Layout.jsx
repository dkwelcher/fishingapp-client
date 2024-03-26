/* 
Layout.jsx establishes the layout of the dashboard. The layout consists of the sidebar & the view. 
The sidebar is dynamically rendered according to device screen size & the view is dynamically rendered according to the active link.

@version 1.0
@since 2024-03-14
*/

import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

/* 
Layout is a component that defines the layout of the dashboard. It dynamically renders the sidebar & the Outlet, which is a child of the layout component.
It also handles sidebar behavior on mobile devices.

@param setUser Setter function for user state passed to Sidebar component specifically for log out event.
@return HTML rendering the sidebar and Outlet.
*/
function Layout({ setUser, screenWidth }) {
  // isOpen state reflects the open / close status of the sidebar on mobile devices.
  const [isOpen, setIsOpen] = useState(false);

  // dropdownRef refers to an HTML element.
  const dropdownRef = useRef(null);

  /*
  toggleNavbar uses sets isOpen to the opposite of its current state.
  */
  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

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
