function AuthInput({
  inputId,
  inputType,
  isAutoCompleteOn,
  handleOnChange,
  handleOnBlur,
}) {
  return (
    <input
      className="w-full px-2 py-1 border border-0 border-zinc-400 rounded-sm bg-slate-700 hover:bg-slate-600 focus:bg-slate-200 focus:text-slate-800 shadow-md shadow-slate-800 outline-none"
      id={inputId}
      type={inputType}
      autoComplete={isAutoCompleteOn ? "on" : "off"}
      onChange={(e) => handleOnChange(e.target.value)}
      onBlur={(e) => handleOnBlur(e.target.value)}
    />
  );
}

export default AuthInput;
