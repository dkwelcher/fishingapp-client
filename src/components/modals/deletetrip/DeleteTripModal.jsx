import { useContext } from "react";
import Button from "../shared/ModalButton.jsx";
import { BaseURLContext } from "../../../lib/context/Context.jsx";

function DeleteTripModal({
  openDeleteTripModal,
  setOpenDeleteTripModal,
  trip,
  setTrip,
  setTripDate,
  user,
}) {
  if (!openDeleteTripModal) return null;

  const baseURL = useContext(BaseURLContext);

  function handleDeleteTripClick() {
    deleteTrip();
    setOpenDeleteTripModal(false);
  }

  function handleCancelClick() {
    setOpenDeleteTripModal(false);
  }

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

  function handleDateFormat(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }

  return (
    <div className="bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950">
      <div className="px-10 py-4">
        <h2 className="mb-4 font-title text-md font-semibold sm:text-2xl">
          Are you sure you want to delete?
        </h2>
        <div className="pt-1">
          <p className="text-center text-sm sm:text-xl">
            {trip.location} on {handleDateFormat(trip.date)}
          </p>
        </div>
        <div className="pt-4 flex justify-center align-items gap-x-4">
          <Button buttonText={"Yes"} handleClick={handleDeleteTripClick} />
          <Button buttonText={"No"} handleClick={handleCancelClick} />
        </div>
      </div>
    </div>
  );
}

export default DeleteTripModal;
