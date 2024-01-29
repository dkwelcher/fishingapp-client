import CatchCard from "./CatchCard";

function TripCard({ trip, catches }) {
  return (
    <div
      className={`w-[95%] mx-auto mb-4 p-4 rounded-md ${
        trip && catches.length > 0
          ? "bg-gradient-to-b from-slate-800 to-slate-400"
          : ""
      }`}
    >
      <div
        className={`w-[500px] h-[500px] bg-green-200 m-auto ${
          trip && catches.length > 0 ? "hidden" : ""
        }`}
      ></div>
      <div className="flex justify-between mb-4 text-white">
        {trip.location && (
          <h2 className="font-title text-2xl">{trip.location}</h2>
        )}
        {trip.date && <h2 className="font-title text-2xl">{trip.date}</h2>}
      </div>
      <div className="px-4">
        {catches && catches.length > 0 && <CatchCard catches={catches} />}
      </div>
    </div>
  );
}

export default TripCard;
