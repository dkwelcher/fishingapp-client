import TripDetails from "./TripDetails.jsx";
import Button from "./shared/TripCardButton.jsx";
import CatchCards from "../catch/CatchCards.jsx";

function TripCard({
  trip,
  catches,
  setCatches,
  setTempCatch,
  openAddCatchModal,
  setOpenAddCatchModal,
  openEditCatchModal,
  setOpenEditCatchModal,
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  screenWidth,
  handleEditTripClick,
  handleDeleteTripClick,
}) {
  return (
    <div className="p-4 rounded-sm bg-slate-800 shadow-md shadow-slate-800">
      <div className="mb-4 pb-4 flex justify-between border-0 border-b-4 border-slate-300">
        <div className="w-full flex flex-col items-start text-white">
          <TripDetails trip={trip} />
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            buttonTextShort={"Edit"}
            buttonTextLong={"Edit Current Trip"}
            screenWidth={screenWidth}
            handleClick={handleEditTripClick}
          />
          <Button
            buttonTextShort={"Delete"}
            buttonTextLong={"Delete Current Trip"}
            screenWidth={screenWidth}
            handleClick={handleDeleteTripClick}
          />
        </div>
      </div>
      <div className="px-6">
        {trip.location && trip.date && (
          <CatchCards
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
  );
}

export default TripCard;
