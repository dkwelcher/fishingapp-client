function DeleteTripModal({
  openDeleteTripModal,
  setOpenDeleteTripModal,
  trip,
  setTrip,
  setTripDate,
}) {
  if (!openDeleteTripModal) return null;

  function handleDeleteTrip() {
    deleteTrip();
    setTrip({});
    setTripDate();
  }

  async function deleteTrip() {
    const DELETE_TRIP_BY_ID = `http://localhost:8080/trips/${trip.id}`;
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
    } catch (error) {
      console.log(error);
    }
  }

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
