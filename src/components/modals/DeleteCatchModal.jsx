function DeleteCatchModal({
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  user,
  tempCatch,
  setTempCatch,
  setCatches,
}) {
  if (!openDeleteCatchModal) return null;

  function handleDeleteCatch() {
    deleteCatch();
  }

  async function deleteCatch() {
    const tempCatchId = tempCatch.id;
    const deleteBody = {
      date: tempCatch.date,
      bodyOfWater: tempCatch.location,
      user: {
        id: user.id,
      },
    };
    const DELETE_CATCH_BY_ID = `http://localhost:8080/catches/${tempCatchId}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(DELETE_CATCH_BY_ID, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      setCatches((catches) => {
        return catches.filter((catchItem) => catchItem.id !== tempCatchId);
      });
      setTempCatch({});
    } catch (error) {
      console.log(error);
    }
  }

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed p-2 flex justify-center items-center bg-transparent-shadow z-50";
  const modalCardStyles = "bg-white rounded-md font-paragraph";
  const infoContainerStyles = "px-10 py-4";
  const infoTitleStyles = "mb-4 font-title text-xl font-semibold";
  const infoSectionContainerStyles = "grid grid-cols-1 gap-y-1";
  const infoSectionStyles = "grid grid-cols-2";
  const infoSubHeaderStyles = "font-semibold";
  const buttonContainerStyles = "pt-4 flex justify-center align-items gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={infoContainerStyles}>
          <h2 className={infoTitleStyles}>Are you sure you want to delete?</h2>
          <div>
            <div className={infoSectionContainerStyles}>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Time:</p>
                <p>{handleTimeConversionTo12HourFormat(tempCatch.time)}</p>
              </div>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Fish:</p>
                <p>{tempCatch.fish}</p>
              </div>
            </div>
            <div className={infoSectionContainerStyles}>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Bait:</p>
                <p>{tempCatch.bait}</p>
              </div>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Weather:</p>
                <p>{tempCatch.weather}</p>
              </div>
            </div>
            <div className={infoSectionContainerStyles}>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Latitude:</p>
                <p>{tempCatch.latitude}</p>
              </div>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Longitude:</p>
                <p>{tempCatch.longitude}</p>
              </div>
            </div>
            <div className={infoSectionContainerStyles}>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Air Temp:</p>
                <p>{tempCatch.airTemp}</p>
              </div>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Water Temp:</p>
                <p>{tempCatch.waterTemp}</p>
              </div>
            </div>
            <div className={infoSectionContainerStyles}>
              <div className={infoSectionStyles}>
                <p className={infoSubHeaderStyles}>Wind Speed:</p>
                <p>{tempCatch.windSpeed}</p>
              </div>
              <div className={infoSectionStyles}></div>
            </div>
          </div>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                handleDeleteCatch();
                setOpenDeleteCatchModal(false);
              }}
            >
              Yes
            </button>
            <button
              className={buttonStyles}
              onClick={() => {
                setOpenDeleteCatchModal(false);
                setTempCatch({});
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCatchModal;
