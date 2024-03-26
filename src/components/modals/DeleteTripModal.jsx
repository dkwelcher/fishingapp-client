/* 
DeleteTripModal.jsx is an intermediate dashboard component that displays the trip object to be deleted.

@since 2024-03-18
*/

/* 
DeleteTripModal renders a container with text related to the selected trip. It provides two buttons
that allow the user to confirm or cancel deletion of the trip.

@param openDeleteTripModal Boolean value the represents whether the delete trip modal is open or closed.
@param setOpenDeleteTripModal Setter function that sets the openDeleteTripModal to true or false.
@param trip An object that holds trip properties.
@param setTrip Setter function that sets the state of the trip object.
@param setTripDate Setter function that sets the state of the tripDate String.
@param user An object that holds user properties.
@param baseURL String that represents the base URL of the server.
@return HTML that renders the container that holds data related to the trip to be deleted & buttons for confirmation & cancellation.
*/
function DeleteTripModal({
  openDeleteTripModal,
  setOpenDeleteTripModal,
  trip,
  setTrip,
  setTripDate,
  user,
  baseURL,
}) {
  if (!openDeleteTripModal) return null;

  /* 
  The function calls the deleteTrip() function.
  */
  function handleDeleteTrip() {
    deleteTrip();
  }

  /* 
  The function makes a DELETE request to the server. If successful, the deleted trip &
  tripDate states are set to undefined.
  */
  async function deleteTrip() {
    const DELETE_TRIP_BY_ID = `${baseURL}/trips/${trip.id}?userId=${user.id}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(DELETE_TRIP_BY_ID, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      setTrip({});
      setTripDate();
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  The function converts the date object to a formatted String.

  @param date An object with date properties: year, month, & day.
  */
  function handleDateFormat(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  /* Tailwind Class Styles */
  const modalContainerStyles =
    "w-full h-screen fixed p-2 flex justify-center items-center bg-transparent-shadow text-slate-800 z-50";
  const modalCardStyles =
    "bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950";
  const infoContainerStyles = "px-10 py-4";
  const infoTitleStyles = "mb-4 font-title text-md font-semibold sm:text-2xl";
  const infoSectionContainerStyles = "pt-1";
  const infoSectionParagraphStyles = "text-center text-sm sm:text-xl";
  const buttonContainerStyles = "pt-4 flex justify-center align-items gap-x-4";
  const buttonStyles =
    "bg-slate-800 text-slate-200 px-6 py-2 rounded-sm shadow-md shadow-slate-600 hover:bg-slate-700";
  /* End Tailwind Class Styles */

  return (
    <div className={modalContainerStyles}>
      <div className={modalCardStyles}>
        <div className={infoContainerStyles}>
          <h2 className={infoTitleStyles}>Are you sure you want to delete?</h2>
          <div className={infoSectionContainerStyles}>
            <p className={infoSectionParagraphStyles}>
              {trip.location} on {handleDateFormat(trip.date)}
            </p>
          </div>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                handleDeleteTrip();
                setOpenDeleteTripModal(false);
              }}
            >
              Yes
            </button>
            <button
              className={buttonStyles}
              onClick={() => setOpenDeleteTripModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTripModal;
