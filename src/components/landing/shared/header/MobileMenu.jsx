import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function MobileMenu({ toggleNavbar, isMobileMenuOpen }) {
  return (
    <button
      className="absolute right-4 text-3xl text-slate-500 z-50 md:invisible"
      onClick={() => {
        toggleNavbar();
      }}
    >
      {isMobileMenuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
    </button>
  );
}

export default MobileMenu;
