import { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";

function Feedback({ user, baseURL }) {
  const [feedback, setFeedback] = useState("");
  const [selectPage, setSelectPage] = useState("landing page");
  const [submitFeedback, setSubmitFeedback] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

  useEffect(() => {
    if (submitFeedback && feedback) {
      postFeedback();
      setSubmitFeedback(false);
    }
  }, [feedback, submitFeedback]);

  function handleFeedback() {
    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback) {
      setFormSubmissionErrorMessage("Feedback cannot be empty");
      return;
    }

    const MAX_LENGTH_SUBMISSION = 1000;
    if (trimmedFeedback.length > MAX_LENGTH_SUBMISSION) {
      setFormSubmissionErrorMessage(
        `Feedback cannot exceed ${MAX_LENGTH_SUBMISSION} words`
      );
      return;
    }

    formatFeedback();
    setSubmitFeedback(true);
  }

  function formatFeedback() {
    const currentTime = new Date().toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setFeedback(
      (prevFeedback) =>
        `user=${user.id} feedbackOn=${selectPage} (${currentTime}): ${prevFeedback}`
    );
  }

  async function postFeedback() {
    const POST_FEEDBACK = `${baseURL}/feedback?userId=${user.id}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(POST_FEEDBACK, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }

      setFeedback("");
      setSelectPage("landing page");
      setFormSubmissionErrorMessage("");
      setSuccessfulSubmission(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearSubmissionConfirmation() {
    setSuccessfulSubmission(false);
  }

  /* Tailwind Class Styles */
  const pageStyles =
    "p-4 flex flex-col h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-slate-800";
  const successfulSubmissionParagraphStyles = "text-center";
  const cardContainerStyles =
    "p-8 max-w-[500px] rounded-sm bg-gradient-to-b from-slate-600 to-slate-700 shadow-md shadow-slate-900";
  const contentContainerStyles = "";
  const logoContainerStyles =
    "pb-4 flex gap-x-2 items-center font-cursive text-slate-300";
  const logoImageStyles = "size-10 md:size-11 lg:size-13";
  const logoNameStyles = "text-3xl md:text-4xl lg:text-5xl";
  const descriptionContainerStyles = "pb-8";
  const descriptionTitleStyles = "pb-2 font-title font-semibold text-lg";
  const descriptionParagraphContainerStyles = "text-slate-300";
  const descriptionParagraphStyles = "pb-2 last:pb-0";
  const formContainerStyles = "w-full";
  const formStyles = "w-full min-h-[180px]";
  const inputStyles =
    "px-2 py-1 bg-slate-50 text-slate-800 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600 focus:bg-slate-200 focus:text-slate-900 outline-none";
  const textAreaStyles = "w-full min-h-[180px] mt-1 p-1 text-slate-800";
  const buttonContainerStyles = "py-2 flex flex-col";
  const buttonStyles =
    "py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <div
        className={`max-w-[500px] w-full py-1 bg-transparent-shadow ${
          successfulSubmission ? "visible" : "invisible"
        }`}
      >
        <p className={successfulSubmissionParagraphStyles}>
          Thank you for submitting
        </p>
      </div>
      <div className={cardContainerStyles}>
        <div className={contentContainerStyles}>
          <div className={logoContainerStyles}>
            <img
              className={logoImageStyles}
              src={Logo}
              alt="Largemouth bass breaching the water"
            />
            <h2 className={logoNameStyles}>Fishing App</h2>
          </div>
          <div className={descriptionContainerStyles}>
            <h2 className={descriptionTitleStyles}>FEEDBACK</h2>
            <div className={descriptionParagraphContainerStyles}>
              <p className={descriptionParagraphStyles}>
                If you are reporting a bug, then please provide as many specific
                details as you can. Otherwise, feel free to comment on what you
                do & don't like about the app.
              </p>
            </div>
          </div>
        </div>
        <div className={formContainerStyles}>
          <form className={formStyles}>
            <div className="flex flex-col gap-y-1">
              <p>Please select which part of the app:</p>
              <select
                className={inputStyles}
                value={selectPage}
                type="text"
                onChange={(e) => setSelectPage(e.target.value)}
              >
                <option value="landing-page">landing page</option>
                <option value="signup-page">Signup page</option>
                <option value="login-page">Login page</option>
                <option value="home-page">Home page</option>
                <option value="manage-trips-page">Manage Trips page</option>
                <option value="other">other</option>
              </select>
            </div>
            <textarea
              className={textAreaStyles}
              value={feedback}
              onChange={(e) => {
                handleClearSubmissionConfirmation();
                setFeedback(e.target.value);
              }}
            ></textarea>
          </form>
          <div>
            <p
              className={`py-2 text-red-600 text-center ${
                formSubmissionErrorMessage.length > 0 ? "visible" : "hidden"
              }`}
            >
              {formSubmissionErrorMessage}
              {"."}
            </p>
          </div>
          <div className={buttonContainerStyles}>
            <button
              className={buttonStyles}
              onClick={() => {
                handleFeedback();
              }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
