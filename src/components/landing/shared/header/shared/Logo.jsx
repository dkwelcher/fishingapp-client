import LogoImage from "../../../../../assets/logo.png";

function Logo() {
  return (
    <div className="flex gap-x-2">
      <img
        className="size-8 sm:size-9 md:size-10 lg:size-14"
        src={LogoImage}
        alt="Log of a largemouth bass jumping out of the water"
      />
      <h2 className="font-cursive text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Fishing App
      </h2>
    </div>
  );
}

export default Logo;
