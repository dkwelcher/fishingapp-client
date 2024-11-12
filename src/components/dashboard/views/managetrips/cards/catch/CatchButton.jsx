function CatchButton({ buttonText, index, setOpenModal, handleCatch }) {
  return (
    <button
      className="bg-slate-800 text-slate-200 px-6 py-2 rounded-sm hover:bg-slate-700 shadow-md shadow-slate-900"
      data-key={index}
      onClick={(e) => {
        const dataKey = e.currentTarget.getAttribute("data-key");
        setOpenModal(true);
        handleCatch(dataKey);
      }}
    >
      {buttonText}
    </button>
  );
}

export default CatchButton;
