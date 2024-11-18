import { useState, useEffect, useRef } from "react";
import Logo from "./Logo.jsx";
import MobileMenu from "./MobileMenu.jsx";
import AuthLink from "./AuthLink.jsx";
import MobileAuthLink from "./MobileAuthLink.jsx";

function Heading({ handleLoginEntry, handleSignupEntry }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  function toggleNavbar() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <>
      <Logo />
      <MobileMenu
        toggleNavbar={toggleNavbar}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <nav className="flex gap-x-4 items-center cursor-pointer invisible md:visible">
        <AuthLink handleAuth={handleSignupEntry} linkText={"Sign up"} />
        <AuthLink handleAuth={handleLoginEntry} linkText={"Log in"} />
      </nav>
      <nav
        ref={dropdownRef}
        className={`w-full md:w-11/12 flex flex-col justify-center items-center gap-y-2 absolute bg-white h-1/4 rounded-sm transition-all duration-1000 ease-in-out -translate-x-2 translate-y-11 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <MobileAuthLink handleAuth={handleSignupEntry} linkText={"Sign up"} />
        <MobileAuthLink handleAuth={handleLoginEntry} linkText={"Log in"} />
      </nav>
    </>
  );
}

export default Heading;
