import Header from "../header/LandingPageHeader.jsx";
import HeroContent from "./HeroContent.jsx";

function Hero({ handleLoginEntry, handleSignupEntry }) {
  return (
    <div className="h-[80vh] bg-hero-image bg-cover bg-center shadow-slate-800">
      <nav>
        <Header
          handleLoginEntry={handleLoginEntry}
          handleSignupEntry={handleSignupEntry}
        />
      </nav>
      <HeroContent handleSignupEntry={handleSignupEntry} />
    </div>
  );
}

export default Hero;
