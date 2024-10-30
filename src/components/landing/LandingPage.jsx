import { useNavigate } from "react-router-dom";
import Header from "./shared/header/LandingPageHeader.jsx";
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
      <Callout handleSignupEntry={handleSignupEntry} />
      <Footer />
    </div>
  );
}

export default LandingPage;
