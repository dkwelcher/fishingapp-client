import Button from "../../shared/ModalButton.jsx";

function SelectTripCard({ trip, index, handleSelectTripClick }) {
  return (
    <div className="mb-2 flex justify-between items-center p-2 border border-slate-700 text-sm rounded-sm">
      <div>
        <h2 className="font-title text-lg font-semibold sm:text-xl">
          {trip.bodyOfWater}
        </h2>
        <p>{trip.date}</p>
      </div>
      <div>
        <Button
          buttonText={"Select"}
          index={index}
          handleClick={handleSelectTripClick}
        />
      </div>
    </div>
  );
}

export default SelectTripCard;
