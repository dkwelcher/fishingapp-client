function SignupLink({ handleNavigateToLogin }) {
  "pl-1 underline text-slate-300 cursor-pointer hover:text-slate-100";
  return (
    <p className="pt-2 text-center">
      Already have an
      <a
        className="pl-1 underline text-slate-300 cursor-pointer hover:text-slate-100"
        onClick={() => {
          handleNavigateToLogin();
        }}
      >
        account
      </a>
      ?
    </p>
  );
}

export default SignupLink;
