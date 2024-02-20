import CatchCard from "./CatchCard";

function TripCard({
  trip,
  setTrip,
  tempTrip,
  setTempTrip,
  catches,
  setCatches,
  setTempCatch,
  openAddCatchModal,
  setOpenAddCatchModal,
  openEditCatchModal,
  setOpenEditCatchModal,
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  openEditTripModal,
  setOpenEditTripModal,
  openDeleteTripModal,
  setOpenDeleteTripModal,
}) {
  function handleEditTrip() {
    setTempTrip(trip);
  }

  function handleDateFormat(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  /* Tailwind Class Styles */
  const tripCardContainerStyles =
    "w-[95%] mx-auto mb-4 p-4 rounded-md bg-gradient-to-b from-slate-800 to-slate-400";
  const tripCardStyles = "mb-8 flex justify-between";
  const tripCardInfoContainerStyles = "flex text-white";
  const tripCardInfoTripNameStyles = "font-title font-semibold text-5xl";
  const tripCardInfoTripDateStyles = "font-title ml-6 text-2xl";
  const tripCardButtonContainerStyles = "flex items-center gap-4";
  const tripCardButtonStyles =
    "bg-slate-200 text-slate-600 px-6 py-2 rounded-sm font-paragraph font-bold hover:bg-slate-100 hover:text-slate-500";
  const tripCardCatchCardContainerStyles = "px-6";
  /* End Tailwind Class Styles */

  return (
    <div className={tripCardContainerStyles}>
      <div className={tripCardStyles}>
        <div className={tripCardInfoContainerStyles}>
          {trip.location && (
            <h2 className={tripCardInfoTripNameStyles}>{trip.location}</h2>
          )}
          {trip.date && (
            <h2 className={tripCardInfoTripDateStyles}>
              {handleDateFormat(trip.date)}
            </h2>
          )}
        </div>
        <div className={tripCardButtonContainerStyles}>
          <button
            className={tripCardButtonStyles}
            onClick={() => {
              setOpenEditTripModal(true);
              handleEditTrip();
            }}
          >
            Edit Current Trip Info
          </button>
          <button
            className={tripCardButtonStyles}
            onClick={() => {
              setOpenDeleteTripModal(true);
            }}
          >
            Delete Current Trip
          </button>
        </div>
      </div>
      <div className={tripCardCatchCardContainerStyles}>
        {trip.location && trip.date ? (
          <CatchCard
            catches={catches}
            setCatches={setCatches}
            setTempCatch={setTempCatch}
            openAddCatchModal={openAddCatchModal}
            setOpenAddCatchModal={setOpenAddCatchModal}
            openEditCatchModal={openEditCatchModal}
            setOpenEditCatchModal={setOpenEditCatchModal}
            openDeleteCatchModal={openDeleteCatchModal}
            setOpenDeleteCatchModal={setOpenDeleteCatchModal}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TripCard;
