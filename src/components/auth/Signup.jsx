import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSignup() {
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    postNewUser(newUser);
  }

  async function postNewUser(newUser) {
    const POST_NEW_USER = "http://localhost:8080/auth/register";

    try {
      const response = await fetch(POST_NEW_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      const data = await response.json();

      if (data.token) {
        handleNavigateToLogin();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateToLogin() {
    navigate("/login");
  }

  /* Tailwind Class Styles */
  const pageStyles =
    "p-4 flex h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800";
  const cardContainerStyles =
    "p-8 max-w-[500px] rounded-sm bg-gradient-to-b from-slate-600 to-slate-700";
  const contentContainerStyles = "";
  const logoContainerStyles =
    "pb-4 flex gap-x-2 items-center font-cursive text-slate-300";
  const logoImageStyles = "size-10 md:size-11 lg:size-13";
  const logoNameStyles = "text-3xl md:text-4xl lg:text-5xl";
  const descriptionContainerStyles = "pb-8";
  const descriptionTitleStyles = "pb-2 font-title font-semibold text-lg";
  const descriptionParagraphStyles = "";
  const formContainerStyles = "";
  const formStyles = "";
  const inputContainerStyles = "pb-2 flex flex-col";
  const inputStyles =
    "px-2 py-1 border border-0 border-zinc-400 rounded-sm bg-slate-700 hover:bg-slate-600 focus:bg-slate-200 focus:text-slate-800 shadow-md shadow-slate-800";
  const errorMessageStyles = "py-2 text-center invisible";
  const buttonContainerStyles = "py-2 flex flex-col";
  const buttonStyles =
    "py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800";
  const loginLinkContainerStyles = "pt-2 text-center";
  const loginLinkStyles = "pl-1 underline text-slate-300 hover:text-slate-100";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div className={cardContainerStyles}>
        <div className={contentContainerStyles}>
          <div className={logoContainerStyles}>
            <img
              className={logoImageStyles}
              src={Logo}
              alt="Man fishing in a row boat"
            />
            <h2 className={logoNameStyles}>Fishing App</h2>
          </div>
          <div className={descriptionContainerStyles}>
            <h2 className={descriptionTitleStyles}>CREATE YOUR OWN ACCOUNT</h2>
            <p className={descriptionParagraphStyles}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad
              nobis consectetur autem. Voluptate quo rerum praesentium tempora.
              Maiores corrupti aliquam blanditiis iste numquam harum.
            </p>
          </div>
        </div>
        <div className={formContainerStyles}>
          <form className={formStyles}>
            <div className={inputContainerStyles}>
              <label htmlFor="">Username:</label>
              <input
                className={inputStyles}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="">Email:</label>
              <input
                className={inputStyles}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="">Password:</label>
              <input
                className={inputStyles}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={inputContainerStyles}>
              <label htmlFor="">Confirm Password:</label>
              <input className={inputStyles} type="password" />
            </div>
          </form>
          <p className={errorMessageStyles}>Error message</p>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                handleSignup();
              }}
            >
              Create your account
            </button>
          </div>
          <p className={loginLinkContainerStyles}>
            Already have an
            <a className={loginLinkStyles} href="./login">
              account
            </a>
            ?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
