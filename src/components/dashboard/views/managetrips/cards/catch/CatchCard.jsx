import CatchButton from "./CatchButton.jsx";

function CatchCard({
  catchItem,
  index,
  handleEditCatch,
  handleDeleteCatch,
  handleTimeConversionTo12HourFormat,
  setOpenEditCatchModal,
  setOpenDeleteCatchModal,
}) {
  function formatKey(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <div
      className={`p-4 rounded-sm shadow-md shadow-slate-900 max-w-[300px] ${
        index % 2 == 0
          ? "bg-gradient-to-b from-slate-600 to-slate-700"
          : "bg-gradient-to-b from-slate-500 to-slate-600"
      }`}
      key={catchItem.id}
    >
      <div>
        {Object.entries(catchItem).map(
          ([key, value], index) =>
            key != "id" && (
              <div key={index} className="flex">
                <p className="font-bold pr-2">{formatKey(key)}:</p>
                <p>
                  {key === "time"
                    ? handleTimeConversionTo12HourFormat(value)
                    : value}
                </p>
              </div>
            )
        )}
      </div>
      <div className="pt-4 flex justify-center items-center gap-4">
        <CatchButton
          buttonText={"Edit"}
          index={index}
          setOpenModal={setOpenEditCatchModal}
          handleCatch={handleEditCatch}
        />
        <CatchButton
          buttonText={"Delete"}
          index={index}
          setOpenModal={setOpenDeleteCatchModal}
          handleCatch={handleDeleteCatch}
        />
      </div>
    </div>
  );
}

export default CatchCard;
