import Heading from "../header/Heading.jsx";
import Content from "./HeroContent.jsx";

function Hero({ handleLoginEntry, handleSignupEntry }) {
  return (
    <>
      <header className="flex justify-between p-2 lg:p-4">
        <Heading
          handleLoginEntry={handleLoginEntry}
          handleSignupEntry={handleSignupEntry}
        />
      </header>
      <div className="p-2 flex flex-col justify-center items-center gap-y-2 h-4/5 md:gap-y-4">
        <Content handleSignupEntry={handleSignupEntry} />
      </div>
    </>
  );
}

export default Hero;
