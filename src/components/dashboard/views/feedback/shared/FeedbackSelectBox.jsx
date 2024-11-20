function FeedbackSelectBox({
  elementId,
  elementValue,
  handleOnChange,
  optionValuesArray,
}) {
  function formatValue(value) {
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <select
      className="w-full p-1 bg-slate-50 text-slate-800 border border-solid border-slate-400 rounded-sm shadow-sm shadow-slate-600 focus:bg-slate-200 focus:text-slate-900 outline-none"
      id={elementId}
      value={elementValue}
      type="text"
      onChange={(e) => handleOnChange(e.target.value)}
    >
      {optionValuesArray.map((optionValue, index) => {
        return (
          <option key={index} value={optionValue}>
            {formatValue(optionValue)}
          </option>
        );
      })}
    </select>
  );
}

export default FeedbackSelectBox;
