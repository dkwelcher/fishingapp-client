import CatchButton from "./CatchButton.jsx";

function CatchCard({
  catchItem,
  index,
  handleEditCatchClick,
  handleDeleteCatchClick,
}) {
  function formatKey(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
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
          handleClick={handleEditCatchClick}
        />
        <CatchButton
          buttonText={"Delete"}
          index={index}
          handleClick={handleDeleteCatchClick}
        />
      </div>
    </div>
  );
}

export default CatchCard;
