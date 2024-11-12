function TripButtons({
  trip,
  setTempTrip,
  setOpenEditTripModal,
  setOpenDeleteTripModal,
  screenWidth,
}) {
  const customBreakpoint = 1139;

  function handleEditTrip() {
    setTempTrip(trip);
  }

  const buttonStyles =
    "bg-slate-300 text-slate-600 px-2 py-1 rounded-sm font-paragraph font-bold shadow-md shadow-slate-900 hover:bg-slate-100 hover:text-slate-500 sm:px-4 sm:py-2";

  return (
    <div className="w-full flex justify-end items-center gap-4">
      <button
        className={buttonStyles}
        onClick={() => {
          setOpenEditTripModal(true);
          handleEditTrip();
        }}
      >
        {screenWidth < customBreakpoint ? "Edit" : "Edit Current Trip Info"}
      </button>
      <button
        className={buttonStyles}
        onClick={() => {
          setOpenDeleteTripModal(true);
        }}
      >
        {screenWidth < customBreakpoint ? "Delete" : "Delete Current Trip"}
      </button>
    </div>
  );
}

export default TripButtons;
