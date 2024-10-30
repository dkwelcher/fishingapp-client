/* 
LandingPage.jsx is a primary component that displays the landing page of the app where users can navigate to the signup & login page.

@since 2024-10-30
*/
import { useNavigate } from "react-router-dom";
import Section1Image from "../../assets/striped-bass.png";
import Section2Image from "../../assets/blue-catfish.png";
import Section3Image from "../../assets/pier.png";
import Header from "./shared/header/LandingPageHeader.jsx";

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
  const pageStyles = "font-paragraph bg-slate-200 text-slate-200";
  const heroAndNavigationContainerStyles =
    "h-[80vh] bg-hero-image bg-cover bg-center shadow-slate-800";

  /* Hero */
  const heroContentContainerStyles =
    "p-2 flex flex-col justify-center items-center gap-y-2 h-4/5 md:gap-y-4";
  const heroTitleStyles =
    "text-center font-bold text-5xl leading-normal text-shadow md:text-6xl lg:w-3/6 lg:text-7xl xl:text-8xl";
  const heroGetStartedLinkStyles =
    "px-6 py-4 border border-solid border-slate-200 rounded-xl text-2xl text-slate-200 bg-transparent-shadow cursor-pointer hover:no-underline hover:bg-slate-600 active:no-underline active:bg-slate-600 lg:text-3xl 2xl:text-4xl";

  /* Main Content */
  const mainContainerStyles =
    "py-12 px-4 sm:py-20 md:px-12 lg:py-28 2xl:py-36 text-slate-800";
  const mainSectionsContainerStyles =
    "pb-12 sm:pb-20 sm:flex sm:flex-col sm:items-center lg:pb-28 2xl:pb-52 2xl:flex-row 2xl:justify-center 2xl:items-start 2xl:gap-x-20";
  const mainSubSectionStyles =
    "flex flex-col 2xl:flex-row 2xl:justify-center 2xl:gap-x-20";
  const mainSubSectionsContainerStyles =
    "pb-12 last:pb-0 sm:pb-20 sm:flex sm:flex-col sm:items-center lg:pb-28 2xl:pb-0";
  const mainSectionsImageContainerStyles = "pb-2";
  const mainSectionsImageStyles = "rounded-lg shadow-slate-800";
  const mainSectionsInfoContainerStyles =
    "p-4 rounded-sm sm:max-w-[600px] 2xl:p-8";
  const sectionTitleStyles =
    "pb-4 text-2xl md:text-3xl lg:text-4xl 2xl:text-5x font-semibold";
  const sectionSpanStyles =
    "text-blue-600 text-3xl font-bold md:text-4xl lg:text-5xl lg:font-bold";
  const sectionParagraphStyles =
    "text-slate-400 text-sm md:text-base lg:text-lg 2xl:text-xl";

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
    <div className={pageStyles}>
      <div className={heroAndNavigationContainerStyles}>
        <nav>
          <Header
            handleLoginEntry={handleLoginEntry}
            handleSignupEntry={handleSignupEntry}
          />
        </nav>
        <div className={heroContentContainerStyles}>
          <h1 className={heroTitleStyles}>
            Track your catches & fishing adventures
          </h1>
          <a
            className={heroGetStartedLinkStyles}
            onClick={() => {
              handleSignupEntry();
            }}
          >
            Get Started
          </a>
        </div>
      </div>
      <main className={mainContainerStyles}>
        <div className={mainSectionsContainerStyles}>
          <div className={mainSectionsImageContainerStyles}>
            <img
              className={mainSectionsImageStyles}
              src={Section1Image}
              alt="Caught striped bass being held up by man"
            />
          </div>
          <div className={mainSectionsInfoContainerStyles}>
            <h2 className={sectionTitleStyles}>
              What is <span className={sectionSpanStyles}>Fishing App?</span>
            </h2>
            <p className={sectionParagraphStyles}>
              Fishing App's mission is to improve your fishing journeys by
              providing you with your own secure, personal database. Within the
              dashboard, you can create and manage your fishing trip history and
              record your catching successes. The upcoming feature, Trip
              Planner, will take your personal catch data and the forecasted
              weather to provide optimal fishing locations and strategies to
              enhance your fishing experience. Fishing App is your ultimate
              companion for catching more fish.
            </p>
          </div>
        </div>
        <div className={mainSubSectionStyles}>
          <div className={mainSubSectionsContainerStyles}>
            <div className={mainSectionsImageContainerStyles}>
              <img
                className={mainSectionsImageStyles}
                src={Section2Image}
                alt="Caught blue catfish being held up by man"
              />
            </div>
            <div className={mainSectionsInfoContainerStyles}>
              <h2 className={sectionTitleStyles}>Fishing Trip Planner</h2>
              <p className={sectionParagraphStyles}>
                This upcoming feature will help you catch more fish. Just select
                the date of your planned fishing trip, and the Fishing Trip
                Planner will do the rest. By combining your fishing trip history
                and the forecasted weather on the day of the planned trip, the
                Fishing Trip Planner algorithm will give you fishing
                recommendations and strategies to catch more fish.
              </p>
            </div>
          </div>
          <div className={mainSubSectionsContainerStyles}>
            <div className={mainSectionsImageContainerStyles}>
              <img
                className={mainSectionsImageStyles}
                src={Section3Image}
                alt="Looking out from beach pier toward town"
              />
            </div>
            <div className={mainSectionsInfoContainerStyles}>
              <h2 className={sectionTitleStyles}>Auto-Generated Input</h2>
              <p className={sectionParagraphStyles}>
                This upcoming feature will make your fishing trips more
                efficient. All time-, geographic-, & weather-related data will
                be automatically generated for you, leaving more time for
                catching your limit.
              </p>
            </div>
          </div>
        </div>
      </main>
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
