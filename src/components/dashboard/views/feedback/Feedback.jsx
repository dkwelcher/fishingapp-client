import { useState, useEffect, useContext } from "react";
import Content from "./shared/FeedbackContent.jsx";
import Form from "./shared/FeedbackForm.jsx";
import { BaseURLContext } from "../../../../lib/context/Context.jsx";
import { AuthContext } from "../../../../lib/context/Context.jsx";

function Feedback() {
  const baseURL = useContext(BaseURLContext);
  const { user, setUser } = useContext(AuthContext);

  const [userInput, setUserInput] = useState("");
  const [selectPage, setSelectPage] = useState("Landing page");
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState("");

  /* 
    The useEffect detects if userInput is truthy & hasSubmittedFeedback is true, then calls postFeedback(), & sets hasSubmittedFeedback state to false.
    Its purpose is to ensure the userInput state is updated before sending a POST request to the server.
  */
  useEffect(() => {
    if (hasSubmittedFeedback && userInput) {
      postFeedback();
      setHasSubmittedFeedback(false);
    }
  }, [userInput, hasSubmittedFeedback]);

  function handleFeedback() {
    const trimmedFeedback = userInput.trim();

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
    setHasSubmittedFeedback(true);
  }

  function formatFeedback() {
    const currentTime = new Date().toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUserInput(
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
        body: JSON.stringify(userInput),
      });

      if (!response.ok) {
        setFormSubmissionErrorMessage("Something went wrong. Please try again");
      } else {
        setUserInput("");
        setSelectPage("landing page");
        setFormSubmissionErrorMessage("");
        setIsSuccessfulSubmission(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearSubmissionConfirmation() {
    setIsSuccessfulSubmission(false);
  }

  return (
    <div className="p-4 flex flex-col h-screen justify-center items-center font-paragraph font-normal text-sm lg:text-base text-slate-200 bg-feedback-image-mobile lg:bg-feedback-image-desktop bg-cover bg-center">
      <p className="absolute bottom-1 right-1 text-xs 2xl:text-sm">
        Image credit: Hala Strohmier Berry
      </p>
      <div
        className={`max-w-[500px] w-full lg:mb-2 py-1 bg-transparent-shadow-feedback-success rounded-sm ${
          isSuccessfulSubmission ? "visible" : "invisible"
        }`}
      >
        <p className="font-title font-semibold text-lg text-center text-slate-800">
          Thank you for submitting
        </p>
      </div>
      <div className="p-8 max-w-[500px] rounded-sm bg-transparent-shadow-darker lg:bg-transparent-shadow shadow-md shadow-slate-900">
        <Content />
        <Form
          userInput={userInput}
          setUserInput={setUserInput}
          selectPage={selectPage}
          setSelectPage={setSelectPage}
          formSubmissionErrorMessage={formSubmissionErrorMessage}
          handleClearSubmissionConfirmation={handleClearSubmissionConfirmation}
          handleFeedback={handleFeedback}
        />
      </div>
    </div>
  );
}

export default Feedback;
