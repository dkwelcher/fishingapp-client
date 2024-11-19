import { useContext } from "react";
import Button from "../shared/ModalButton.jsx";
import { BaseURLContext } from "../../../lib/context/Context.jsx";

function DeleteCatchModal({
  openDeleteCatchModal,
  setOpenDeleteCatchModal,
  user,
  tempCatch,
  setTempCatch,
  setCatches,
}) {
  if (!openDeleteCatchModal) return null;

  const baseURL = useContext(BaseURLContext);

  function handleDeleteCatchClick() {
    deleteCatch();
    setOpenDeleteCatchModal(false);
  }

  function handleCancelClick() {
    setOpenDeleteCatchModal(false);
    setTempCatch({});
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

  function formatKey(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  function handleTimeConversionTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "pm" : "am";
    const newHours = ((hoursInt + 11) % 12) + 1;
    return `${newHours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  }

  return (
    <div className="px-10 py-4 bg-slate-50 rounded-md font-paragraph md:-translate-x-32 shadow-md shadow-slate-950">
      <h2 className="mb-4 font-title text-xl font-semibold sm:text-2xl lg:text-4xl">
        Are you sure you want to delete?
      </h2>
      <div className="lg:grid lg:grid-cols-2">
        {Object.entries(tempCatch).map(
          ([key, value], index) =>
            key != "id" && (
              <div key={index} className="flex sm:text-lg">
                <p className="font-semibold pr-2">{formatKey(key)}:</p>
                <p>
                  {key === "time"
                    ? handleTimeConversionTo12HourFormat(value)
                    : value}
                </p>
              </div>
            )
        )}
      </div>
      <div className="pt-4 flex justify-center align-items gap-x-4">
        <Button buttonText={"Yes"} handleClick={handleDeleteCatchClick} />
        <Button buttonText={"No"} handleClick={handleCancelClick} />
      </div>
    </div>
  );
}

export default DeleteCatchModal;
