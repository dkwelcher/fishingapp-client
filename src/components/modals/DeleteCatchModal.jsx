/* 
DeleteCatchModal.jsx is an intermediate dashboard component that displays the catch object to be deleted.

@since 2024-03-19
*/

/*
DeleteCatchModal renders a container with text related to the selected catch. It provides two buttons
that allow the user to confirm or cancel deletion of the catch.

@param openDeleteCatchModal Boolean value that represents whether the delete catch modal is open or closed.
@param setOpenDeleteCatchModal Setter function that sets the openDeleteCatchModal to true or false.
@param user An object that holds user properties.
@param tempCatch An object that holds catch properties.
@param setTempCatch An object that holds catch properties temporarily for editing or deleting a catch.
@param setCatches Setter function that sets the state of the catches object array.
@param baseURL String that represents the base URL of the server.
@return HTML that renders the container that holds data related to the catch to be deleted & buttons for confirmation & cancellation.
*/
function DeleteCatchModal({
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  user,
  tempCatch,
  setTempCatch,
  setCatches,
  baseURL,
}) {
  if (!openDeleteCatchModal) return null;

  /* 
  The function calls the deleteCatch() function.
  */
  function handleDeleteCatch() {
    deleteCatch();
  }

  /* 
  The function makes a DELETE request to the server. If successful, the deleted catch object
  is filtered from the existing catches state.
  */
  async function deleteCatch() {
    const tempCatchId = tempCatch.id;
    const deleteBody = {
      date: tempCatch.date,
      bodyOfWater: tempCatch.location,
      user: {
        id: user.id,
      },
    };
    const DELETE_CATCH_BY_ID = `${baseURL}/catches/${tempCatchId}?userId=${user.id}`;
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

  /* 
  The function converts the time from 24hr to 12hr format.

  @param time A Date object that holds time in 24hr format.
  */
  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed p-2 flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const infoContainerStyles = "lg:grid lg:grid-cols-2";
  const infoTitleStyles =
    "mb-4 font-title text-xl font-semibold sm:text-2xl lg:text-4xl";
  const infoSectionContainerStyles = "flex sm:text-lg";
  const infoSubHeaderStyles = "font-semibold pr-2";
  const buttonContainerStyles = "pt-4 flex justify-center align-items gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <h2 className={infoTitleStyles}>Are you sure you want to delete?</h2>
        <div className={infoContainerStyles}>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Time:</p>
            <p>{handleTimeConversionTo12HourFormat(tempCatch.time)}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Fish:</p>
            <p>{tempCatch.fish}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Bait / Lure:</p>
            <p>{tempCatch.bait}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Weather:</p>
            <p>{tempCatch.weather}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Latitude:</p>
            <p>{tempCatch.latitude}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Longitude:</p>
            <p>{tempCatch.longitude}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Air Temp (&deg;F):</p>
            <p>{tempCatch.airTemp}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Water Temp (&deg;F):</p>
            <p>{tempCatch.waterTemp}</p>
          </div>
          <div className={infoSectionContainerStyles}>
            <p className={infoSubHeaderStyles}>Wind Speed (MPH):</p>
            <p>{tempCatch.windSpeed}</p>
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
  );
}

export default DeleteCatchModal;
