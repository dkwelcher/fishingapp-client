import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const existingUser = {
      username: username,
      password: password,
    };
    postExistingUser(existingUser);
  }

  async function postExistingUser(existingUser) {
    const POST_EXISTING_USER = "http://localhost:8080/auth/authenticate";

    try {
      const response = await fetch(POST_EXISTING_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      const data = await response.json();
      const token = data.token;
      const id = data.id;
      const username = data.username;
      const user = {
        id: id,
        username: username,
      };

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser({
        id: id,
        username: username,
      });

      if (data.token) {
        handleDashboardEntry();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleDashboardEntry() {
    navigate("/dashboard");
  }

  return (
    <div className="flex bg-login-image bg-center bg-cover h-screen justify-center items-center">
      <div className="flex gap-20 bg-transparent-shadow rounded-xl">
        <div className="w-full max-w-[500px] px-12 py-8 font-paragraph font-normal bg-white rounded-xl">
          <div className="flex mb-10 items-center font-cursive font-bold text-slate-900">
            <img
              className="size-14"
              src={Logo}
              alt="Man fishing in a row boat"
            />
            <h2 className="text-5xl">Fishing App</h2>
          </div>
          <form className="flex flex-col">
            <label htmlFor="">Username:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="">Password:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <p className="mb-4 text-center invisible">Error message</p>
          <div className="flex mb-4 justify-center">
            <button
              className="px-6 py-4 bg-blue-700 text-white border-0 rounded-xl hover:bg-blue-600"
              onClick={() => {
                handleLogin();
              }}
            >
              Log in
            </button>
          </div>
          <p className="text-center">
            Need to create an
            <a
              className="pl-1 underline text-zinc-800 hover:text-blue-600"
              href="./signup"
            >
              account
            </a>
            ?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
