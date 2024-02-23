import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Section1Image from "../../assets/striped-bass.png";
import Section2Image from "../../assets/blue-catfish.png";
import Section3Image from "../../assets/pier.png";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  function handleDisplayCurrentYear() {
    return new Date().getFullYear();
  }

  function handleLandingPageToTop() {
    navigate("/");
  }

  function handleLoginEntry() {
    navigate("/login");
  }

  function handleSignupEntry() {
    navigate("/signup");
  }

  /* Tailwind Class Styles */
  const pageStyles = "font-paragraph bg-slate-200 text-slate-200";
  /* Header */
  const heroAndNavigationContainerStyles =
    "h-[80vh] bg-hero-image bg-cover bg-center shadow-slate-800";
  const navHeaderStyles = "flex justify-between pt-2 px-2 lg:pt-4 lg:px-4";
  const logoContainerStyles = "flex gap-x-2 items-center font-cursive";
  const anchorLinkStyles = "cursor-pointer";
  const logoImageStyles = "size-8 sm:size-9 md:size-10 lg:size-14";
  const logoLinkStyles = "cursor-pointer hover:no-underline";
  const logoNameStyles =
    "text-2xl text-slate-200 sm:text-3xl md:text-4xl lg:text-5xl";
  const headerLinkContainerStyles =
    "flex items-center cursor-pointer invisible md:visible";
  const headerButtonHamburgerStyles =
    "absolute right-4 text-3xl text-slate-500 z-50 md:invisible";
  const headerLinkHamburgerStyles =
    "hover:no-underline text-slate-800 text-lg hover:text-slate-700";
  const headerLinkStyles =
    "py-2 px-4 hover:no-underline text-slate-500 text-lg rounded-lg hover:bg-slate-500 hover:text-slate-200 lg:text-2xl";
  const heroContentContainerStyles =
    "p-2 flex flex-col justify-center items-center gap-y-2 h-4/5 md:gap-y-4";
  const heroTitleStyles =
    "text-center font-bold text-5xl leading-normal text-shadow md:text-6xl lg:w-3/6 lg:text-7xl xl:text-8xl";
  const heroGetStartedLinkStyles =
    "px-6 py-4 border border-solid border-slate-200 rounded-xl text-2xl text-slate-200 bg-transparent-shadow cursor-pointer hover:no-underline hover:bg-slate-600 lg:text-3xl 2xl:text-4xl";

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
    "pb-4 text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl";
  const sectionSpanStyles =
    "text-blue-600 text-3xl font-semibold md:text-4xl lg:text-5xl lg:font-bold";
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
    "px-4 py-4 border-4 border-solid border-white rounded-2xl text-4xl font-medium text-white text-shadow bg-transparent-shadow cursor-pointer hover:no-underline hover:bg-slate-700 lg:text-6xl";

  /* Footer */
  const footerContainerStyles =
    "flex min-h-24 justify-center items-center bg-slate-800 text-xl font-medium md:min-h-36";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div className={heroAndNavigationContainerStyles}>
        <nav>
          <header className={navHeaderStyles}>
            <div className={logoContainerStyles}>
              <a
                className={anchorLinkStyles}
                onClick={() => {
                  handleLandingPageToTop();
                }}
              >
                <img
                  className={logoImageStyles}
                  src={Logo}
                  alt="Man fishing in a row boat"
                />
              </a>
              <a
                className={logoLinkStyles}
                onClick={() => {
                  handleLandingPageToTop();
                }}
              >
                <h2 className={logoNameStyles}>Fishing App</h2>
              </a>
            </div>
            <button
              className={headerButtonHamburgerStyles}
              onClick={() => {
                toggleNavbar();
              }}
            >
              {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
            </button>
            <div className={headerLinkContainerStyles}>
              <a
                className={headerLinkStyles}
                onClick={() => {
                  handleSignupEntry();
                }}
              >
                <p>Sign up</p>
              </a>
              <a
                className={headerLinkStyles}
                onClick={() => {
                  handleLoginEntry();
                }}
              >
                <p>Log in</p>
              </a>
            </div>
            <div
              className={`w-full flex flex-col justify-center items-center gap-y-2 absolute bg-white h-1/4 rounded-sm transition-all duration-1000 ease-in-out -translate-x-2 translate-y-11 ${
                isOpen ? "opacity-100 visible" : "opacity-0 hidden"
              }`}
            >
              <a
                className={headerLinkHamburgerStyles}
                onClick={() => {
                  handleSignupEntry();
                }}
              >
                <p>Sign up</p>
              </a>
              <a
                className={headerLinkHamburgerStyles}
                onClick={() => {
                  handleLoginEntry();
                }}
              >
                <p>Log in</p>
              </a>
            </div>
          </header>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              pariatur excepturi aliquam harum cum consectetur blanditiis
              accusamus dolorum, voluptas tempore nesciunt veritatis delectus
              nihil sunt sapiente ad. Ab officia ex natus nostrum placeat et,
              cum rem eligendi iusto debitis dolores.
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
              <h2 className={sectionTitleStyles}>
                Lorem ipsum dolor sit amet.
              </h2>
              <p className={sectionParagraphStyles}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                quo optio ad excepturi tenetur vitae dolorum voluptate fugiat
                quis iusto quas quibusdam accusamus velit ab, minima, dolorem
                quod maiores. Neque ad eos cumque est ipsam fugit quidem nam
                vero veritatis.
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
              <h2 className={sectionTitleStyles}>
                Lorem ipsum dolor sit amet.
              </h2>
              <p className={sectionParagraphStyles}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                quo optio ad excepturi tenetur vitae dolorum voluptate fugiat
                quis iusto quas quibusdam accusamus velit ab, minima, dolorem
                quod maiores. Neque ad eos cumque est ipsam fugit quidem nam
                vero veritatis.
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
