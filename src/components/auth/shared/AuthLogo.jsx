import Logo from "../../../assets/logo.png";

function AuthLogo() {
  return (
    <div className="flex gap-x-2 items-center font-cursive text-slate-300">
      <img
        className="size-10 md:size-11 lg:size-13"
        src={Logo}
        alt="Logo of a largemouth bass jumping out of the water"
      />
      <h2 className="text-3xl md:text-4xl lg:text-5xl">Fishing App</h2>
    </div>
  );
}

export default AuthLogo;
