import { useNavigate } from "react-router-dom";
import Header from "./shared/header/LandingPageHeader.jsx";
import Hero from "./shared/hero/Hero.jsx";
import MainContent from "./shared/content/MainContent.jsx";

function LandingPage() {
  const navigate = useNavigate();

  function handleDisplayCurrentYear() {
    return new Date().getFullYear();
  }

  function handleLoginEntry() {
    navigate("/login");
  }

  function handleSignupEntry() {
    navigate("/signup");
  }

  /* Tailwind Class Styles */

  /* Callout */
  const calloutContainerStyles =
    "mb-12 flex bg-callout-image bg-cover bg-center h-screen justify-center items-center sm:mb-20 lg:mb-28 2xl:mb-36 shadow-slate-800";
  const calloutContentContainerStyles =
    "p-4 flex flex-col justify-center items-center";
  const calloutTitleStyles =
    "pb-8 text-center text-3xl text-white text-shadow leading-normal font-bold md:w-5/6 md:text-4xl lg:w-7/12 lg:text-6xl xl:text-7xl";
  const calloutLinkStyles =
    "px-4 py-4 border-4 border-solid border-white rounded-2xl text-4xl font-medium text-white text-shadow bg-transparent-shadow cursor-pointer hover:no-underline hover:bg-slate-700 active:no-underline active:bg-slate-700 lg:text-6xl";

  /* Footer */
  const footerContainerStyles =
    "flex min-h-24 justify-center items-center bg-slate-800 text-xl font-medium md:min-h-36";
  /* End Tailwind Class Styles */

  return (
    <div className="font-paragraph bg-slate-200 text-slate-200">
      <div className="h-[80vh] bg-hero-image bg-cover bg-center shadow-slate-800">
        <nav>
          <Header
            handleLoginEntry={handleLoginEntry}
            handleSignupEntry={handleSignupEntry}
          />
        </nav>
        <Hero handleSignupEntry={handleSignupEntry} />
      </div>
      <MainContent />
      <div className={calloutContainerStyles}>
        <div className={calloutContentContainerStyles}>
          <h1 className={calloutTitleStyles}>
            Record & access your catches to improve your fishing journeys
          </h1>
          <a
            className={calloutLinkStyles}
            onClick={() => {
              handleSignupEntry();
            }}
          >
            Sign up now
          </a>
        </div>
      </div>
      <footer className={footerContainerStyles}>
        <div>Fishing App &copy; {handleDisplayCurrentYear()}</div>
      </footer>
    </div>
  );
}

export default LandingPage;
