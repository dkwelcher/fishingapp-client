import LogoImage from "../../../../../assets/logo.png";

function RecentTripsLogo() {
  return (
    <>
      <img
        className="size-36 sm:size-44 md:size-52 lg:size-64 xl:size-80 2xl:size-96"
        src={LogoImage}
        alt="Logo of a largemouth bass jumping out of the water"
      />
      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[200px]">
        Fishing App
      </h2>
    </>
  );
}

export default RecentTripsLogo;
