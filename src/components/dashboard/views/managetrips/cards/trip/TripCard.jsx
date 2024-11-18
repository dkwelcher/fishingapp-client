import TripDetails from "./TripDetails.jsx";
import Button from "./shared/TripCardButton.jsx";
import AddCatchButton from "./../catch/CatchAddButton.jsx";
import CatchCard from "./../catch/CatchCard.jsx";

function TripCard({
  trip,
  catches,
  setTempCatch,
  setOpenAddCatchModal,
  setOpenEditCatchModal,
  setOpenDeleteCatchModal,
  screenWidth,
  handleEditTripClick,
  handleDeleteTripClick,
}) {
  function handleAddCatchClick() {
    setOpenAddCatchModal(true);
  }

  function handleEditCatch(dataKey) {
    const catchItem = catches[dataKey];
    const newCatchItem = { ...catchItem, index: dataKey };
    setTempCatch(newCatchItem);
  }

  function handleDeleteCatch(dataKey) {
    const catchItem = catches[dataKey];
    setTempCatch(catchItem);
  }

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

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
      <div className="px-6 font-paragraph text-slate-200">
        {trip.location && trip.date && (
          <>
            <AddCatchButton handleClick={handleAddCatchClick} />
            <div className="pt-2 grid gap-4 grid-cols-[repeat(auto-fill,300px)] justify-center">
              {catches.map((catchItem, index) => (
                <CatchCard
                  key={catchItem.id}
                  catchItem={catchItem}
                  index={index}
                  handleEditCatch={handleEditCatch}
                  handleDeleteCatch={handleDeleteCatch}
                  handleTimeConversionTo12HourFormat={
                    handleTimeConversionTo12HourFormat
                  }
                  setOpenEditCatchModal={setOpenEditCatchModal}
                  setOpenDeleteCatchModal={setOpenDeleteCatchModal}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TripCard;
