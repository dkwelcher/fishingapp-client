import Logo from "../../assets/logo.png";
import LargemouthBass from "../../assets/largemouth-bass.png";
import ChannelCatfish from "../../assets/channel-catfish.png";

function Layout() {
  /* Tailwind Class Styles */
  const pageStyles = "font-paragraph";
  const heroAndNavigationContainerStyles =
    "bg-hero-image bg-cover bg-center h-[80vh] p-4 font-medium";
  const navHeaderStyles = "flex justify-between";
  const logoContainerStyles = "flex pl-8 justify-center items-center";
  const logoImageStyles = "size-14";
  const logoLinkStyles = "hover:no-underline";
  const logoNameStyles = "text-5xl pl-2 text-white font-cursive font-black";
  const headerLinkContainerStyles = "flex items-center gap-6 pr-6";
  const headerLinkStyles =
    "hover:no-underline text-white text-2xl hover:text-blue-700";
  const heroContentContainerStyles =
    "flex flex-col justify-center items-center h-4/5";
  const heroTitleStyles =
    "w-3/6 text-center font-title font-bold text-8xl leading-normal text-white text-shadow";
  const heroGetStartedLinkStyles =
    "px-6 py-4 border border-solid border-white rounded-2xl hover:no-underline text-white text-2xl hover:bg-white hover:text-gray-900";
  const mainSectionsContainerStyles = "pt-32 pb-0 px-[20%] flex";
  const mainSectionsImageStyles = "w-full h-full rounded-2xl";
  const imageLeftTextRightSectionContainerStyles = "pl-24";
  const imageRightTextLeftSectionContainerStyles = "pr-24";
  const sectionTitleStyles = "text-5xl font-semibold";
  const sectionSpanStyles = "text-blue-700";
  const sectionParagraphStyles = "text-zinc-600 pt-4 text-xl  font-medium";
  const calloutContainerStyles =
    "flex bg-callout-image bg-cover bg-center h-[1000px] mt-32 justify-center items-center";
  const calloutContentContainerStyles =
    "flex flex-col justify-center items-center";
  const calloutTitleStyles =
    "w-7/12 pb-8 text-center text-7xl text-white text-shadow leading-normal  font-semibold";
  const calloutLinkStyles =
    "px-6 py-4 border-4 border-solid border-white rounded-2xl hover:no-underline text-5xl font-medium text-white text-shadow bg-transparent-shadow hover:bg-blue-700";
  const footerContainerStyles =
    "flex h-[200px] justify-center items-center text-xl  font-medium";
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
            <div className={headerLinkContainerStyles}>
              <a className={headerLinkStyles} href="/signup">
                <p>Sign up</p>
              </a>
              <a className={headerLinkStyles} href="/login">
                <p>Log in</p>
              </a>
            </div>
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
        <div className={mainSectionsContainerStyles}>
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              laboriosam eveniet molestias, error natus, repellat itaque
              accusamus doloremque quasi repellendus dolorem commodi tempora
              quia similique odio hic autem pariatur unde odit enim fuga atque
              aperiam? Omnis fugiat sapiente, quae nostrum doloribus maxime
              necessitatibus animi, et dicta labore debitis ipsa fugit. Quaerat
              ad alias cumque incidunt, ipsum minus debitis nulla neque hic
              eligendi inventore totam, adipisci expedita reprehenderit
              explicabo quasi culpa quis eius? Officiis, dolorum cumque? Placeat
              alias sequi iure corporis esse doloribus minima repellat ipsam
              nihil, non possimus laudantium rerum laborum ea temporibus
              quisquam totam numquam, dolore, dolor cumque quae?
            </p>
          </div>
        </div>
        <div className={mainSectionsContainerStyles}>
          <div className={imageRightTextLeftSectionContainerStyles}>
            <h2 className={sectionTitleStyles}>Lorem ipsum dolor sit amet.</h2>
            <p className={sectionParagraphStyles}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              totam fugit rerum. Nobis officiis fugiat deleniti libero
              cupiditate voluptatibus maiores necessitatibus ex similique
              obcaecati voluptatem doloribus omnis itaque, maxime ad repudiandae
              cumque rerum et optio ipsa vero dolorem amet. Odit, et consectetur
              placeat blanditiis impedit ducimus voluptatibus facere quidem
              repellendus dicta iste odio eum deleniti laudantium culpa illo
              quas porro similique consequuntur ipsum! Eligendi, quos quaerat
              fuga iusto suscipit assumenda officiis consectetur impedit
              cupiditate consequatur. Eius commodi odit aliquam quis, quia
              maiores cum impedit molestias ad nemo itaque est atque officia.
              Debitis mollitia quisquam voluptate optio perspiciatis, repellat
              totam possimus.
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

export default Layout;
