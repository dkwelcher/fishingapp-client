import Heading from "../header/Heading.jsx";
import Content from "./shared/HeroContent.jsx";

function Hero({ handleLoginEntry, handleSignupEntry }) {
  return (
    <>
      <header className="p-2 flex justify-between lg:p-4">
        <Heading
          handleLoginEntry={handleLoginEntry}
          handleSignupEntry={handleSignupEntry}
        />
      </header>
      <div className="h-4/5 p-2 flex flex-col justify-center items-center gap-y-2 md:gap-y-4">
        <Content handleSignupEntry={handleSignupEntry} />
      </div>
    </>
  );
}

export default Hero;
