import Logo from "../../shared/AuthLogo.jsx";
import { SIGNUP_RULES } from "../../../../lib/constants/auth/SignupRules.jsx";

function SignupText() {
  return (
    <>
      <Logo />
      <div className="pb-8">
        <h2 className="pb-2 font-title font-semibold text-lg">
          CREATE YOUR OWN ACCOUNT
        </h2>
        <div className="text-slate-300">
          {SIGNUP_RULES.map((rule, index) => {
            return (
              <p key={index} className="pb-2 last:pb-0">
                {rule}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SignupText;
