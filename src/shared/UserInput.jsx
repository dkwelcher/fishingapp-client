function UserInput({ inputType, inputName, onChangeFunction, inputValue }) {
  const inputStyles = "mr-2 p-1 border border-solid border-zinc-400 rounded-sm";

  return (
    <input
      className={inputStyles}
      type={inputType}
      name={inputName}
      value={inputValue}
      onChange={(e) => {
        onChangeFunction(e);
      }}
    />
  );
}

export default UserInput;
