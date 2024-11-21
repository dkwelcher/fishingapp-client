import { useContext } from "react";
import { ScreenWidthContext } from "../../../../../../../lib/context/Context";

function TripCardButton({ buttonTextShort, buttonTextLong, handleClick }) {
  const screenWidth = useContext(ScreenWidthContext);
  const customBreakpoint = 1139;

  return (
    <button
      className="px-2 py-1 rounded-sm font-paragraph font-bold bg-slate-300 text-slate-600 shadow-md shadow-slate-900 hover:bg-slate-100 hover:text-slate-500 sm:px-4 sm:py-2"
      onClick={() => {
        handleClick();
      }}
    >
      {screenWidth < customBreakpoint
        ? `${buttonTextShort}`
        : `${buttonTextLong}`}
    </button>
  );
}

export default TripCardButton;
