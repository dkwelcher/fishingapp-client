import TripDetails from "./TripDetails.jsx";
import Button from "./shared/TripCardButton.jsx";
import AddCatchButton from "./../catch/CatchAddButton.jsx";
import CatchCard from "./../catch/CatchCard.jsx";

function TripCard({
  trip,
  catches,
  handleEditTripClick,
  handleDeleteTripClick,
  handleAddCatchClick,
  handleEditCatchClick,
  handleDeleteCatchClick,
}) {
  return (
    <div className="p-4 rounded-sm bg-slate-800 shadow-md shadow-slate-800">
      <div className="mb-4 pb-4 flex justify-between border-0 border-b-4 border-slate-300">
        <div className="w-full flex flex-col items-start text-white">
          <TripDetails trip={trip} />
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            buttonTextShort={"Edit"}
            buttonTextLong={"Edit Current Trip"}
            handleClick={handleEditTripClick}
          />
          <Button
            buttonTextShort={"Delete"}
            buttonTextLong={"Delete Current Trip"}
            handleClick={handleDeleteTripClick}
          />
        </div>
      </div>
      <div className="px-6 font-paragraph text-slate-200">
        {trip.location && trip.date && (
          <>
            <AddCatchButton handleClick={handleAddCatchClick} />
            <div className="pt-2 grid gap-4 grid-cols-[repeat(auto-fill,300px)] justify-center">
              {catches.map((catchItem, index) => (
                <CatchCard
                  key={catchItem.id}
                  catchItem={catchItem}
                  index={index}
                  handleEditCatchClick={handleEditCatchClick}
                  handleDeleteCatchClick={handleDeleteCatchClick}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TripCard;
