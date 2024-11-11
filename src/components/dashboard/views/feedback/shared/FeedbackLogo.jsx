import LogoImage from "../../../../../assets/logo.png";

function FeedbackLogo() {
  return (
    <div className="pb-4 flex gap-x-2 items-center font-cursive text-slate-300">
      <img
        className="size-10 md:size-11 lg:size-13"
        src={LogoImage}
        alt="Largemouth bass breaching the water"
      />
      <h2 className="text-3xl md:text-4xl lg:text-5xl">Fishing App</h2>
    </div>
  );
}

export default FeedbackLogo;
