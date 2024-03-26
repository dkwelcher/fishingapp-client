/* 
CatchCard.jsx is a component that displays catch data.

@since 2024-02-23
*/

/* 
CatchCard dynamically renders catch data, prepares tempCatch states for editing or deletion, & converts 24hr time to 12hr time.

@param catches An array of catch objects that are associated with a trip object.
@param setTempCatch Setter function that sets tempCatch state which is used for editing & deleting catch records.
@param setOpenAddCatchModal Setter function that sets openAddCatchModal to true or false.
@param setOpenEditCatchModal Setter function that sets openEditCatchModal to true or false.
@param setOpenDeleteCatchModal Setter function that sets openDeleteCatchModal to true or false.
@return HTML that dynamically renders a styled card containing catch data.
*/
function CatchCard({
  catches,
  setTempCatch,
  setOpenAddCatchModal,
  setOpenEditCatchModal,
  setOpenDeleteCatchModal,
}) {
  /* 
  handleEditCatch extracts the catch record associated with the button, processes it, then sets the tempCatch state with that data.

  @param dataKey The index used to match catch record to catch object in the catches array.
  */
  function handleEditCatch(dataKey) {
    const catchItem = catches[dataKey];
    const newCatchItem = { ...catchItem, index: dataKey };
    setTempCatch(newCatchItem);
  }

  /* 
  handleDeleteCatch extracts the catch record associated with the button, then sets the tempCatch state with that data.

  @param dataKey The index used to match catch record to catch object in the catches array.
  */
  function handleDeleteCatch(dataKey) {
    const catchItem = catches[dataKey];
    setTempCatch(catchItem);
  }

  /* 
  handleTimeConversionTo12HourFormat converts 24hr time to 12hr time for display in catch cards.

  @param time The time formatted in 24hr time.
  @return The time converted to 12hr time & formatted for display.
  */
  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  /* Tailwind Class Styles */
  const catchesContainerStyles = "font-paragraph text-slate-200";
  const addCatchButtonContainerStyles = "pb-2 flex flex-col items-center";
  const addCatchButtonStyles =
    "w-[300px] bg-slate-300 text-slate-600 px-6 py-2 rounded-sm font-bold shadow-md shadow-slate-900 hover:bg-slate-100 hover:text-slate-500";
  const catchCardContainerStyles = "";
  const catchCardInfoContainer = "flex";
  const catchCardSubHeaderStyles = "font-bold pr-2";
  const catchCardResultStyles = "text-slate-300";
  const catchCardButtonContainerStyles =
    "pt-4 flex justify-center items-center gap-4";
  const catchCardButtonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700 shadow-md shadow-slate-900";
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
      <div className="pt-2">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,300px)] justify-center">
          {catches.map((catchItem, i) => (
            <div
              className={`p-4 rounded-sm shadow-md shadow-slate-900 max-w-[300px] ${
                i % 2 == 0
                  ? "bg-gradient-to-b from-slate-600 to-slate-700"
                  : "bg-gradient-to-b from-slate-500 to-slate-600"
              }`}
              key={catchItem.id}
            >
              <div>
                <div className={catchCardContainerStyles}>
                  <div className={catchCardInfoContainer}>
                    <p className={catchCardSubHeaderStyles}>Time:</p>
                    <p className={catchCardResultStyles}>
                      {handleTimeConversionTo12HourFormat(catchItem.time)}
                    </p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatchCard;
