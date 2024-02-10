import { useEffect } from "react";

function CatchCard({
  catches,
  setCatches,
  setTempCatch,
  openAddCatchModal,
  setOpenAddCatchModal,
  openEditCatchModal,
  setOpenEditCatchModal,
  openDeleteCatchModal,
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

  useEffect(() => {
    sortCatches();
  }, [catches]);

  function sortCatches() {
    setCatches((catches) => {
      return [...catches].sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(":").map(Number);
        const [hoursB, minutesB] = b.time.split(":").map(Number);
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;

        return totalMinutesA - totalMinutesB;
      });
    });
  }

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  return (
    <div>
      <div className="mb-4">
        <button
          className="bg-slate-200 text-slate-600 px-6 py-2 rounded-sm font-paragraph font-bold hover:bg-slate-100 hover:text-slate-500"
          onClick={() => setOpenAddCatchModal(true)}
        >
          Add a New Catch
        </button>
      </div>
      <div>
        {catches.map((catchItem, i) => (
          <div
            className={`grid grid-cols-4 ${
              i % 2 == 0 ? "bg-slate-200" : "bg-slate-300"
            } mb-2 p-2 rounded-md`}
            key={catchItem.id}
          >
            <div className="grid grid-cols-2">
              <div className="font-title font-medium text-right">
                <p>Time:</p>
                <p>Fish:</p>
                <p>Bait:</p>
              </div>
              <div className="ml-4 font-paragraph text-sm">
                <p>{handleTimeConversionTo12HourFormat(catchItem.time)}</p>
                <p>{catchItem.fish}</p>
                <p>{catchItem.bait}</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="font-title font-medium text-right">
                <p>Latitude:</p>
                <p>Longitude:</p>
                <p>Weather:</p>
              </div>
              <div className="ml-4 font-paragraph text-sm">
                <p>{catchItem.latitude}</p>
                <p>{catchItem.longitude}</p>
                <p>{catchItem.weather}</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="font-title font-medium text-right">
                <p>Air Temp:</p>
                <p>Water Temp:</p>
                <p>Wind Speed:</p>
              </div>
              <div className="ml-4 font-paragraph text-sm">
                <p>{catchItem.airTemp}</p>
                <p>{catchItem.waterTemp}</p>
                <p>{catchItem.windSpeed}</p>
              </div>
            </div>
            <div className="flex justify-center items-center font-paragraph">
              <button
                className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
                data-key={i}
                onClick={(e) => {
                  const dataKey = e.currentTarget.getAttribute("data-key");
                  setOpenEditCatchModal(true);
                  handleEditCatch(dataKey);
                }}
              >
                Edit
              </button>
              <button
                className="ml-4 bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700"
                data-key={i}
                onClick={(e) => {
                  const dataKey = e.currentTarget.getAttribute("data-key");
                  setOpenDeleteCatchModal(true);
                  handleDeleteCatch(dataKey);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatchCard;
