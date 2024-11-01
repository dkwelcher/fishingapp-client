/* 
Feedback.jsx is a dashboard component that displays a page where the user can provide feedback about the app.

@since 2024-03-19
*/

import { useState, useEffect } from "react";
import Logo from "../../../assets/logo.png";

/* 
Feedback renders a dashboard view with a form where users can provide feedback.

@param user An object with that holds user properties.
@param baseURL String that contains base URL of server.
@return HTML that renders a view with a form that contains a select box, text area, & a submit button.
*/
function Feedback({ user, baseURL }) {
  // state that holds a String based on user input in textArea.
  const [feedback, setFeedback] = useState("");

  // state that holds a String corresponding to pages in the app.
  const [selectPage, setSelectPage] = useState("landing page");

  // state that holds a boolean representing whether the user has submitted feedback by clicking the submit button.
  const [submitFeedback, setSubmitFeedback] = useState(false);

  // state that holds a boolean which controls display of successful submission text.
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  // state that holds a String that holds text related to invalid input.
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

  /* 
    The useEffect detects if feedback is truthy & submitFeedback is true, then calls postFeedback(), & sets submitFeedback state to false.
    Its purpose is to ensure the feedback state is updated before sending a POST request to the server.
  */
  useEffect(() => {
    if (submitFeedback && feedback) {
      postFeedback();
      setSubmitFeedback(false);
    }
  }, [feedback, submitFeedback]);

  /* 
  handleFeedback validates feedback state modified by user. If feedback state is valid, then
  the function calls formatFeedback() & sets submitFeedback to true to trigger useEffect that will
  trigger the POST request to the server.
  */
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

  /* 
  formatFeedback formats the String that will be sent in the POST request.
  */
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

  /* 
  postFeedback is an asynchronous function that makes a POST request to the server using the feedback state.
  If the HTTP status is OK, then all states are reset to initial mounted state; otherwise, an error message is displayed to the user.
  */
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
        setFormSubmissionErrorMessage("Something went wrong. Please try again");
      } else {
        setFeedback("");
        setSelectPage("landing page");
        setFormSubmissionErrorMessage("");
        setSuccessfulSubmission(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* 
  handleClearSubmissionConfirmation sets the successfulSubmission state to false.
  After successful submission, a message will display to the user. When the user begins typing in
  the textArea again, the message will disappear.
  */
  function handleClearSubmissionConfirmation() {
    setSuccessfulSubmission(false);
  }

  /* Tailwind Class Styles */
  const pageStyles =
    "p-4 flex flex-col h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-feedback-image-mobile lg:bg-feedback-image-desktop bg-cover bg-center";
  const imageCreditStyles = "absolute bottom-1 right-1 text-xs 2xl:text-sm";
  const successfulSubmissionParagraphStyles =
    "font-title font-semibold text-lg text-center text-slate-800";
  const cardContainerStyles =
    "p-8 max-w-[500px] rounded-sm bg-transparent-shadow-darker lg:bg-transparent-shadow shadow-md shadow-slate-900";
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
  const textAreaStyles =
    "w-full min-h-[180px] mt-1 p-1 text-slate-800 shadow-sm shadow-slate-600 rounded-sm";
  const buttonContainerStyles = "py-2 flex flex-col";
  const buttonStyles =
    "py-2 border-0 rounded-sm text-slate-800 bg-slate-300 hover:bg-slate-100 shadow-lg shadow-slate-800";
  /* End Tailwind Class Styles */

  return (
    <div className={pageStyles}>
      <p className={imageCreditStyles}>Image credit: Hala Strohmier Berry</p>
      <div
        className={`max-w-[500px] w-full lg:mb-2 py-1 bg-transparent-shadow-feedback-success rounded-sm ${
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
