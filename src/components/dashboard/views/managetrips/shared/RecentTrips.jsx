import Logo from "./RecentTripsLogo.jsx";

function RecentTrips({ tripsLastSixMonths, handleRecentTrip }) {
  return (
    <div className="p-10 px-4">
      <div className="mb-10">
        <h2 className="pl-2 font-title font-semibold text-slate-800 text-lg">
          Last Six Months:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1800px]:grid-cols-4">
          {Object.entries(tripsLastSixMonths).map(
            ([monthYear, trips], index) => (
              <div
                key={index}
                className="p-2 m-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm"
              >
                <h2
                  key={monthYear}
                  className="mb-2 font-title text-slate-200 border border-0 border-b-2 2xl:text-lg"
                >
                  {monthYear}
                </h2>
                {trips.map((trip) => (
                  <p
                    className="pb-0.5 last:pb-0 font-paragraph text-sm 2xl:text-base"
                    key={trip.tripId}
                  >
                    <a
                      className="text-slate-300 cursor-pointer hover:no-underline hover:text-slate-50 active:text-slate-50"
                      data-key={trip.tripId}
                      onClick={(e) => {
                        const dataKey =
                          e.currentTarget.getAttribute("data-key");
                        handleRecentTrip(dataKey);
                      }}
                    >
                      {trip.bodyOfWater}, {trip.formattedDate}
                    </a>
                  </p>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <div className="pb-10 flex flex-col justify-center items-center gap-x-2 font-cursive text-slate-900">
        <Logo />
      </div>
    </div>
  );
}

export default RecentTrips;
