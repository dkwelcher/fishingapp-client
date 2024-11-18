import { useNavigate } from "react-router-dom";
import Hero from "./shared/hero/Hero.jsx";
import MainContent from "./shared/content/MainContent.jsx";
import Callout from "./shared/callout/Callout.jsx";
import Footer from "./shared/footer/Footer.jsx";

function LandingPage() {
  const navigate = useNavigate();

  function handleLoginEntry() {
    navigate("/login");
  }

  function handleSignupEntry() {
    navigate("/signup");
  }

  return (
    <div className="font-paragraph text-white">
      <div className="h-[80vh] bg-hero-image bg-cover bg-center">
        <Hero
          handleLoginEntry={handleLoginEntry}
          handleSignupEntry={handleSignupEntry}
        />
      </div>
      <main className="py-12 px-4 sm:py-20 md:px-12 lg:py-28 2xl:py-36 text-slate-800">
        <MainContent />
      </main>
      <div className="mb-12 flex bg-callout-image bg-cover bg-center h-screen justify-center items-center sm:mb-20 lg:mb-28 2xl:mb-36 shadow-slate-800">
        <Callout handleSignupEntry={handleSignupEntry} />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
