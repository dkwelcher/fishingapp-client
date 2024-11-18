function MobileAuthLink({ handleAuth, linkText }) {
  return (
    <a
      className="p-1 text-slate-600 text-lg rounded-sm cursor-pointer hover:no-underline hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white"
      onClick={() => {
        handleAuth();
      }}
    >
      <p>{linkText}</p>
    </a>
  );
}

export default MobileAuthLink;
