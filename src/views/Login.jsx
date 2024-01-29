import Logo from "../assets/logo.png";

function Login() {
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
            <label for="">Username:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="text"
            />
            <label for="">Password:</label>
            <input
              className="mb-4 px-2 py-1 border border-solid border-zinc-400 rounded-xl"
              type="password"
            />
          </form>
          <p className="mb-4 text-center invisible">Error message</p>
          <div className="flex mb-4 justify-center">
            <button className="px-6 py-4 bg-blue-700 text-white border-0 rounded-xl hover:bg-blue-600">
              Log in
            </button>
          </div>
          <p className="text-center">
            Need to create an
            <a
              className="pl-1 underline text-zinc-800 hover:text-blue-600"
              href="../index.html"
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
