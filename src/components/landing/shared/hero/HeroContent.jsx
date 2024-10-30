function Hero({ handleSignupEntry }) {
  return (
    <div className="p-2 flex flex-col justify-center items-center gap-y-2 h-4/5 md:gap-y-4">
      <h1 className="text-center font-bold text-5xl leading-normal text-shadow md:text-6xl lg:w-3/6 lg:text-7xl xl:text-8xl">
        Track your catches & fishing adventures
      </h1>
      <a
        className="px-6 py-4 border border-solid border-slate-200 rounded-xl text-2xl text-slate-200 bg-transparent-shadow cursor-pointer hover:no-underline hover:bg-slate-600 active:no-underline active:bg-slate-600 lg:text-3xl 2xl:text-4xl"
        onClick={() => {
          handleSignupEntry();
        }}
      >
        Get Started
      </a>
    </div>
  );
}

export default Hero;
