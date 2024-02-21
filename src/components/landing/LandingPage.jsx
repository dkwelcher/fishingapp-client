import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import LargemouthBass from "../../assets/largemouth-bass.png";
import ChannelCatfish from "../../assets/channel-catfish.png";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  /* Tailwind Class Styles */
  const pageStyles = "font-paragraph";
  const heroAndNavigationContainerStyles =
    "h-[80vh] bg-hero-image bg-cover bg-center font-medium";
  const navHeaderStyles = "flex justify-between pt-2 px-2 lg:pt-4 lg:px-4";
  const logoContainerStyles = "flex justify-center items-center";
  const logoImageStyles = "size-9 md:size-10 lg:size-14";
  const logoLinkStyles = "hover:no-underline";
  const logoNameStyles =
    "text-3xl pl-2 text-white font-cursive font-black md:text-4xl lg:text-5xl";
  const headerLinkContainerStyles =
    "flex items-center invisible md:visible md:gap-4 md: pr-4";
  const headerButtonHamburgerStyles = "";
  const headerLinkHamburgerContainerStyles =
    "flex flex-col justify-center items-center absolute bg-white w-[90%] h-1/4 translate-x-3";
  const headerLinkHamburgerStyles =
    "hover:no-underline text-black text-lg hover:text-blue-700";
  const headerLinkStyles =
    "hover:no-underline text-white text-lg hover:text-blue-700 lg:text-2xl";
  const heroContentContainerStyles =
    "flex flex-col justify-center items-center h-4/5";
  const heroTitleStyles =
    "text-center font-title font-bold text-5xl leading-normal text-white text-shadow md:text-6xl lg:w-3/6 lg:text-7xl xl:text-8xl";
  const heroGetStartedLinkStyles =
    "px-6 py-4 border border-solid border-white rounded-2xl hover:no-underline text-white text-2xl hover:bg-white hover:text-gray-900";
  const mainSectionsContainer1Styles =
    "pt-10 px-[10%] flex flex-col sm:items-center lg:grid lg:grid-cols-2 lg:pt-20 lg:justify-items-start xl:px-[20%]";
  const mainSectionsContainer2Styles =
    "pt-10 px-[10%] flex flex-col-reverse sm:items-center lg:grid lg:grid-cols-2 lg:pt-20 lg:justify-items-end xl:px-[20%]";
  const mainSectionsImageStyles = "pb-4 rounded-2xl sm:w-[500px] lg:pb-0";
  const imageLeftTextRightSectionContainerStyles =
    "sm:w-[500px] lg:py-4 lg:px-10";
  const imageRightTextLeftSectionContainerStyles =
    "sm:w-[500px] lg:py-4 lg:px-10";
  const sectionTitleStyles = "text-4xl pb-4 font-semibold text-center";
  const sectionSpanStyles = "text-blue-700";
  const sectionParagraphStyles = "text-zinc-600 text-md font-medium";
  const calloutContainerStyles =
    "mt-4 flex bg-callout-image bg-cover bg-center h-screen justify-center items-center lg:mt-20";
  const calloutContentContainerStyles =
    "flex flex-col justify-center items-center";
  const calloutTitleStyles =
    "pb-8 text-center text-3xl text-white text-shadow leading-normal font-semibold md:w-5/6 md:text-4xl lg:w-7/12 lg:text-6xl xl:text-7xl";
  const calloutLinkStyles =
    "px-4 py-4 border-4 border-solid border-white rounded-2xl hover:no-underline text-5xl font-medium text-white text-shadow bg-transparent-shadow hover:bg-blue-700";
  const footerContainerStyles =
    "flex min-h-24 justify-center items-center text-xl font-medium";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div className={heroAndNavigationContainerStyles}>
        <nav>
          <header className={navHeaderStyles}>
            <div className={logoContainerStyles}>
              <a href="#">
                <img
                  className={logoImageStyles}
                  src={Logo}
                  alt="Man fishing in a row boat"
                />
              </a>
              <a className={logoLinkStyles} href="#">
                <h2 className={logoNameStyles}>Fishing App</h2>
              </a>
            </div>
            <button
              className={`absolute right-4 text-3xl text-white z-50 md:invisible ${
                isOpen && "text-black"
              }`}
              onClick={() => {
                toggleNavbar();
              }}
            >
              {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
            </button>
            <div className={headerLinkContainerStyles}>
              <a className={headerLinkStyles} href="/signup">
                <p>Sign up</p>
              </a>
              <a className={headerLinkStyles} href="/login">
                <p>Log in</p>
              </a>
            </div>
            {isOpen && (
              <div className={headerLinkHamburgerContainerStyles}>
                <a className={headerLinkHamburgerStyles} href="/signup">
                  <p>Sign up</p>
                </a>
                <a className={headerLinkHamburgerStyles} href="/login">
                  <p>Log in</p>
                </a>
              </div>
            )}
          </header>
        </nav>
        <div className={heroContentContainerStyles}>
          <h1 className={heroTitleStyles}>
            Track your catches & fishing adventures
          </h1>
          <a className={heroGetStartedLinkStyles} href="/signup">
            Get Started
          </a>
        </div>
      </div>
      <main>
        <div className={mainSectionsContainer1Styles}>
          <img
            className={mainSectionsImageStyles}
            src={LargemouthBass}
            alt="Largemouth bass suspended by a submerged log and vegetation"
          />
          <div className={imageLeftTextRightSectionContainerStyles}>
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
        <div className={mainSectionsContainer2Styles}>
          <div className={imageRightTextLeftSectionContainerStyles}>
            <h2 className={sectionTitleStyles}>Lorem ipsum dolor sit amet.</h2>
            <p className={sectionParagraphStyles}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              quo optio ad excepturi tenetur vitae dolorum voluptate fugiat quis
              iusto quas quibusdam accusamus velit ab, minima, dolorem quod
              maiores. Neque ad eos cumque est ipsam fugit quidem nam vero
              veritatis.
            </p>
          </div>
          <img
            className={mainSectionsImageStyles}
            src={ChannelCatfish}
            alt="Largemouth bass suspended by a submerged log and vegetation"
          />
        </div>
        <div className={calloutContainerStyles}>
          <div className={calloutContentContainerStyles}>
            <h1 className={calloutTitleStyles}>
              Record & access your catches to improve your fishing journeys
            </h1>
            <a className={calloutLinkStyles} href="/signup">
              Sign up now
            </a>
          </div>
        </div>
      </main>
      <footer className={footerContainerStyles}>
        <div>Team 16 &copy; 2023</div>
      </footer>
    </div>
  );
}

export default LandingPage;
