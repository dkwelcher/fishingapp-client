import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function Layout({ setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Tailwind Class Styles */
  const pageStyles =
    "flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden";
  const viewStyles = "flex-col flex-1 overflow-auto";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div>
        <button
          className={`absolute left-1 top-1 text-3xl text-white z-50 sm:invisible`}
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
      <div className="h-full sm:visible sm:static">
        {isOpen && screenWidth < 640 && (
          <Sidebar setUser={setUser} screenWidth={screenWidth} />
        )}
      </div>
      <div className={viewStyles}>
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
