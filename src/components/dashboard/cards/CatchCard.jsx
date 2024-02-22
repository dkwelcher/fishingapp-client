function CatchCard({
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

  /* Tailwind Class Styles */
  const catchesContainerStyles = "font-paragraph";
  const addCatchButtonContainerStyles =
    "pb-2 flex flex-col min-[900px]:flex-row";
  const addCatchButtonStyles =
    "bg-slate-200 text-slate-600 px-6 py-2 rounded-sm font-bold hover:bg-slate-100 hover:text-slate-500";
  const catchCardContainerStyles =
    "sm:grid sm:grid-cols-2 sm:gap-x-2 md:block min-[900px]:grid min-[900px]:grid min-[1200px]:grid-cols-3 xl:gap-x-4 2xl:grid-cols-4 2xl:gap-x-6 min-[1800px]:grid-cols-5 min-[2200px]:flex";
  const catchCardInfoContainer = "flex min-[2200px]:flex-col";
  const catchCardSubHeaderStyles = "font-semibold pr-2";
  const catchCardButtonContainerStyles =
    "pt-4 flex justify-center items-center gap-4 xl:pt-0";
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
            className={`my-2 p-4 xl:flex xl:justify-between xl:items-center xl:px-10 min-[2200px]:justify-around ${
              i % 2 == 0 ? "bg-slate-200" : "bg-slate-300"
            }`}
            key={catchItem.id}
          >
            <div className={catchCardContainerStyles}>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Time:</p>
                <p>{handleTimeConversionTo12HourFormat(catchItem.time)}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Fish:</p>
                <p>{catchItem.fish}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Bait:</p>
                <p>{catchItem.bait}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Latitude:</p>
                <p>{catchItem.latitude}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Longitude:</p>
                <p>{catchItem.longitude}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Weather:</p>
                <p>{catchItem.weather}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Air Temp:</p>
                <p>{catchItem.airTemp}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Water Temp:</p>
                <p>{catchItem.waterTemp}</p>
              </div>
              <div className={catchCardInfoContainer}>
                <p className={catchCardSubHeaderStyles}>Wind Speed:</p>
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
