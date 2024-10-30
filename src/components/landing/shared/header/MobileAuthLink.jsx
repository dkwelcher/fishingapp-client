function MobileAuthLink({ handleAuth, linkText }) {
  return (
    <a
      className="hover:no-underline text-slate-800 text-lg hover:text-slate-700"
      onClick={() => {
        handleAuth();
      }}
    >
      <p>{linkText}</p>
    </a>
  );
}

export default MobileAuthLink;
