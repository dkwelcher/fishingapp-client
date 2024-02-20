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

  return (
    <div className="w-[95%] mx-auto mb-4 p-4 rounded-md bg-gradient-to-b from-slate-800 to-slate-400">
      <div className="mb-8 flex justify-between">
        <div className="flex text-white">
          {trip.location && (
            <h2 className="font-title font-semibold text-5xl">
              {trip.location}
            </h2>
          )}
          {trip.date && (
            <h2 className="font-title ml-6 text-2xl">
              {handleDateFormat(trip.date)}
            </h2>
          )}
        </div>
        <div className="flex items-center">
          <button
            className="bg-slate-200 text-slate-600 px-6 py-2 rounded-sm font-paragraph font-bold hover:bg-slate-100 hover:text-slate-500"
            onClick={() => {
              setOpenEditTripModal(true);
              handleEditTrip();
            }}
          >
            Edit Current Trip Info
          </button>
          <button
            className="ml-4 bg-slate-200 text-slate-600 px-6 py-2 rounded-sm font-paragraph font-bold hover:bg-slate-100 hover:text-slate-500"
            onClick={() => {
              setOpenDeleteTripModal(true);
            }}
          >
            Delete Current Trip
          </button>
        </div>
      </div>
      <div className="px-6">
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
