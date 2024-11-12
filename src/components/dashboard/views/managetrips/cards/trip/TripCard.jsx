import TripDetails from "./TripDetails.jsx";
import TripButtons from "./TripButtons.jsx";
import CatchCard from "../catch/CatchCard.jsx";

function TripCard({
  trip,
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
  setOpenEditTripModal,
  setOpenDeleteTripModal,
  screenWidth,
}) {
  return (
    <div className="py-4 sm:p-4 lg:py6 2xl:py-10">
      <div className="p-4 rounded-sm bg-slate-800 shadow-md shadow-slate-800">
        <div className="mb-4 pb-4 flex justify-between border-0 border-b-4 border-slate-300">
          <TripDetails trip={trip} />
          <TripButtons
            trip={trip}
            setTempTrip={setTempTrip}
            setOpenEditTripModal={setOpenEditTripModal}
            setOpenDeleteTripModal={setOpenDeleteTripModal}
            screenWidth={screenWidth}
          />
        </div>
        <div className="px-6">
          {trip.location && trip.date && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default TripCard;
