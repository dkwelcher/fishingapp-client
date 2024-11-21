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
    <div className="p-4 flex flex-col gap-y-4 rounded-sm bg-slate-800 text-white">
      <div className="pb-4 flex justify-between border-0 border-b-4 border-slate-300">
        <div className="w-full">
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
      <div className="px-6 flex flex-col gap-y-4 font-paragraph">
        {trip.location && trip.date && (
          <>
            <div className="m-auto">
              <AddCatchButton handleClick={handleAddCatchClick} />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,18.75rem)] justify-center">
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
