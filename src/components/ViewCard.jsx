function ViewCard({ catches }) {
  return (
    <div>
      {catches.map((catchItem, i) => (
        <div
          className={`${
            i % 2 == 0 ? "bg-slate-200" : "bg-slate-300"
          } mb-2 p-2 rounded-md`}
        >
          <div className="grid grid-cols-9 border-b border-b-black mb-2 font-title font-medium">
            <p>Time</p>
            <p>Species</p>
            <p>Latitude</p>
            <p>Longitude</p>
            <p>Bait</p>
            <p>Weather</p>
            <p>Air Temp</p>
            <p>Water Temp</p>
            <p>Wind Speed</p>
          </div>
          <div className="grid grid-cols-9 font-paragraph text-sm">
            <p>{catchItem.time}</p>
            <p>{catchItem.fish}</p>
            <p>{catchItem.latitude}</p>
            <p>{catchItem.longitude}</p>
            <p>{catchItem.bait}</p>
            <p>{catchItem.weather}</p>
            <p>{catchItem.airTemp}</p>
            <p>{catchItem.waterTemp}</p>
            <p>{catchItem.windSpeed}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewCard;
