function Callout({ handleSignupEntry }) {
  return (
    <div className="mb-12 flex bg-callout-image bg-cover bg-center h-screen justify-center items-center sm:mb-20 lg:mb-28 2xl:mb-36 shadow-slate-800">
      <div className="p-4 flex flex-col justify-center items-center">
        <h1 className="pb-8 text-center text-3xl text-white text-shadow leading-normal font-bold md:w-5/6 md:text-4xl lg:w-7/12 lg:text-6xl xl:text-7xl">
          Record & access your catches to improve your fishing journeys
        </h1>
        <a
          className="px-4 py-4 border-4 border-solid border-white rounded-2xl text-4xl font-medium text-white text-shadow bg-transparent-shadow cursor-pointer hover:no-underline hover:bg-slate-700 active:no-underline active:bg-slate-700 lg:text-6xl"
          onClick={() => {
            handleSignupEntry();
          }}
        >
          Sign up now
        </a>
      </div>
    </div>
  );
}

export default Callout;
