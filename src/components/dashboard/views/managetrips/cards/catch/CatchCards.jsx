import AddCatchButton from "./CatchAddButton.jsx";
import CatchCard from "./CatchCard.jsx";

function CatchCards({
  catches,
  setTempCatch,
  setOpenAddCatchModal,
  setOpenEditCatchModal,
  setOpenDeleteCatchModal,
}) {
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
    <div className="font-paragraph text-slate-200">
      <AddCatchButton setOpenAddCatchModal={setOpenAddCatchModal} />
      <div className="pt-2">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,300px)] justify-center">
          {catches.map((catchItem, index) => (
            <CatchCard
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
      </div>
    </div>
  );
}

export default CatchCards;
