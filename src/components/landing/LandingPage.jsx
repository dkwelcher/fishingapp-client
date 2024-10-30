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
    <div className="font-paragraph bg-slate-200 text-slate-200">
      <Hero
        handleLoginEntry={handleLoginEntry}
        handleSignupEntry={handleSignupEntry}
      />
      <MainContent />
      <Callout handleSignupEntry={handleSignupEntry} />
      <Footer />
    </div>
  );
}

export default LandingPage;
