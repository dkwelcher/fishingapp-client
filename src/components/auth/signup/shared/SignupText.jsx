import { SIGNUP_RULES } from "../../../../lib/constants/auth/SignupRules.jsx";

function SignupText() {
  return (
    <>
      <h2 className="pb-2 font-title font-semibold text-lg">
        CREATE YOUR OWN ACCOUNT
      </h2>
      {SIGNUP_RULES.map((rule, index) => {
        return (
          <p key={index} className="pb-2 last:pb-0">
            {rule}
          </p>
        );
      })}
    </>
  );
}

export default SignupText;
