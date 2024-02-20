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

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  /* Tailwind Class Styles */
  const catchesContainerStyles = "font-paragraph";
  const addCatchButtonContainerStyles = "pb-4";
  const addCatchButtonStyles =
    "bg-slate-200 text-slate-600 px-6 py-2 rounded-sm font-bold hover:bg-slate-100 hover:text-slate-500";
  const catchCardColumnStyles = "grid grid-cols-2";
  const catchCardInfoSubHeaderContainer = "font-title font-medium text-right";
  const catchCardInfoResultsContainer = "ml-4 text-sm";
  const catchCardButtonContainerStyles =
    "flex justify-center items-center gap-4";
  const catchCardButtonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={catchesContainerStyles}>
      <div className={addCatchButtonContainerStyles}>
        <button
          className={addCatchButtonStyles}
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
            <div className={catchCardColumnStyles}>
              <div className={catchCardInfoSubHeaderContainer}>
                <p>Time:</p>
                <p>Fish:</p>
                <p>Bait:</p>
              </div>
              <div className={catchCardInfoResultsContainer}>
                <p>{handleTimeConversionTo12HourFormat(catchItem.time)}</p>
                <p>{catchItem.fish}</p>
                <p>{catchItem.bait}</p>
              </div>
            </div>
            <div className={catchCardColumnStyles}>
              <div className={catchCardInfoSubHeaderContainer}>
                <p>Latitude:</p>
                <p>Longitude:</p>
                <p>Weather:</p>
              </div>
              <div className={catchCardInfoResultsContainer}>
                <p>{catchItem.latitude}</p>
                <p>{catchItem.longitude}</p>
                <p>{catchItem.weather}</p>
              </div>
            </div>
            <div className={catchCardColumnStyles}>
              <div className={catchCardInfoSubHeaderContainer}>
                <p>Air Temp:</p>
                <p>Water Temp:</p>
                <p>Wind Speed:</p>
              </div>
              <div className={catchCardInfoResultsContainer}>
                <p>{catchItem.airTemp}</p>
                <p>{catchItem.waterTemp}</p>
                <p>{catchItem.windSpeed}</p>
              </div>
            </div>
            <div className={catchCardButtonContainerStyles}>
              <button
                className={catchCardButtonStyles}
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
                className={catchCardButtonStyles}
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
