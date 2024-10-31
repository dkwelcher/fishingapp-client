function LoginButton({ handleLogin }) {
  return (
    <div className="py-2 flex flex-col">
      <button
        className="py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800"
        onClick={() => {
          handleLogin();
        }}
      >
        Log in
      </button>
    </div>
  );
}

export default LoginButton;