function TripCardButton({
  buttonTextShort,
  buttonTextLong,
  screenWidth,
  handleClick,
}) {
  const customBreakpoint = 1139;

  return (
    <button
      className="bg-slate-300 text-slate-600 px-2 py-1 rounded-sm font-paragraph font-bold shadow-md shadow-slate-900 hover:bg-slate-100 hover:text-slate-500 sm:px-4 sm:py-2"
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
