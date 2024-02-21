import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function Layout({ setUser, screenWidth }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  /* Tailwind Class Styles */
  const pageStyles =
    "flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden";
  const viewStyles = "flex-col flex-1 overflow-auto";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div>
        <button
          className={`absolute left-2 top-2 text-3xl text-white z-50 sm:invisible`}
          onClick={() => {
            toggleNavbar();
          }}
        >
          {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
      </div>
      <div className="invisible absolute sm:visible sm:static">
        {screenWidth >= 640 && (
          <Sidebar setUser={setUser} screenWidth={screenWidth} />
        )}
      </div>
      <div className={`z-40 h-full ${screenWidth < 640 ? "" : "hidden"}`}>
        <div
          className={`z-30 transition-all duration-700 ease-in-out ${
            isOpen && screenWidth < 640
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
