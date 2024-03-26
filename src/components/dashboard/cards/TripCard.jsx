/* 
TripCard.jsx is an intermediate component that displays trip data & the CatchCard component.

@since 2024-02-22
*/

import CatchCard from "./CatchCard";

/* 
TripCard dynamically renders trip data, prepares tempTrip state for editing or deletion, handles date formatting, &
renders the CatchCard component.

@param trip The current trip object that the user has selected to manage.
@param setTempTrip The temporary trip object that will be edited or deleted by the user.
@param catches An array of catch objects that are associated with a trip object.
@param setCatches Setter function to set state of catches object array.
@param setTempCatch Setter function that sets tempCatch state used for editing & deleting catch records.
@param openAddCatchModal Boolean state used to determine open / closed state of add catch modal.
@param setOpenAddCatchModal Setter function that sets openAddCatchModal to true or false.
@param openEditCatchModal Boolean state used to determine open / closed state of edit catch modal.
@param setOpenEditCatchModal Setter function that sets openEditCatchModal to true or false.
@param openDeleteCatchModal Boolean state used to determine open / closed state of delete catch modal.
@param setOpenDeleteCatchModal Setter function that sets openDeleteCatchModal to true or false.
@param setOpenEditTripModal Setter function that sets openEditTripModal to true or false.
@param setOpenDeleteTripModal Setter function that sets openDeleteTripModal to true or false.
@param screenWidth Integer value of the user's device screen width.
@return HTML that renders a text card with headings, text, & buttons related to the selected trip & the CatchCard component.
*/
function TripCard({
  trip,
  setTempTrip,
  catches,
  setCatches,
  setTempCatch,
  openAddCatchModal,
  setOpenAddCatchModal,
  openEditCatchModal,
  setOpenEditCatchModal,
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  setOpenEditTripModal,
  setOpenDeleteTripModal,
  screenWidth,
}) {
  /* 
  handleEditTrip sets the tempTrip state to the trip object.
  */
  function handleEditTrip() {
    setTempTrip(trip);
  }

  /* 
  handleDateFormat converts the date object to Strings to be formatted & displayed in a user-friendly way.

  @param date The data object associated with the trip object.
  @return String that formats date to MM/DD/YYYY
  */
  function handleDateFormat(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  /* Tailwind Class Styles */
  const tripContainerStyles = "py-4 sm:p-4 lg:py6 2xl:py-10";
  const tripCardContainerStyles =
    "p-4 rounded-sm bg-slate-800 shadow-md shadow-slate-800";
  const tripCardStyles =
    "mb-4 pb-4 flex justify-between border-0 border-b-4 border-slate-300";
  const tripCardInfoContainerStyles =
    "w-full flex flex-col items-start text-white";
  const tripCardInfoTripNameStyles =
    "font-title font-semibold text-xl sm:text-2xl md:text-3xl xl:text-5xl";
  const tripCardInfoTripDateStyles =
    "font-title text-md md:text-lg xl:text-2xl";
  const tripCardButtonContainerStyles =
    "w-full flex justify-end items-center gap-4";
  const tripCardButtonStyles =
    "bg-slate-300 text-slate-600 px-2 py-1 rounded-sm font-paragraph font-bold shadow-md shadow-slate-900 hover:bg-slate-100 hover:text-slate-500 sm:px-4 sm:py-2";
  const tripCardCatchCardContainerStyles = "px-6";
  /* End Tailwind Class Styles */

  return (
    <div className={tripContainerStyles}>
      <div className={tripCardContainerStyles}>
        <div className={tripCardStyles}>
          <div className={tripCardInfoContainerStyles}>
            {trip.location && (
              <h2 className={tripCardInfoTripNameStyles}>{trip.location}</h2>
            )}
            {trip.date && (
              <h2 className={tripCardInfoTripDateStyles}>
                {handleDateFormat(trip.date)}
              </h2>
            )}
          </div>
          <div className={tripCardButtonContainerStyles}>
            <button
              className={tripCardButtonStyles}
              onClick={() => {
                setOpenEditTripModal(true);
                handleEditTrip();
              }}
            >
              {screenWidth < 1139 ? "Edit" : "Edit Current Trip Info"}
            </button>
            <button
              className={tripCardButtonStyles}
              onClick={() => {
                setOpenDeleteTripModal(true);
              }}
            >
              {screenWidth < 1139 ? "Delete" : "Delete Current Trip"}
            </button>
          </div>
        </div>
        <div className={tripCardCatchCardContainerStyles}>
          {trip.location && trip.date ? (
            <CatchCard
              catches={catches}
              setCatches={setCatches}
              setTempCatch={setTempCatch}
              openAddCatchModal={openAddCatchModal}
              setOpenAddCatchModal={setOpenAddCatchModal}
              openEditCatchModal={openEditCatchModal}
              setOpenEditCatchModal={setOpenEditCatchModal}
              openDeleteCatchModal={openDeleteCatchModal}
              setOpenDeleteCatchModal={setOpenDeleteCatchModal}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default TripCard;
