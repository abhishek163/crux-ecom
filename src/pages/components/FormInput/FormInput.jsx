import { useState } from "react";
import "./forminput.styles.css";

export function FormInput(otherInputProps) {
  const [focused, setFocused] = useState(false);

  function handleFocus() {
    setFocused(true);
  }

  const {
    label,
    name,
    placeholder,
    type,
    required,
    pattern,
    errorMessage,
    onChangeInput,
    value,
    isErrorMessageVisible,
  } = otherInputProps;

  return (
    <div className="user__input-container">
      <label className="user__label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        required={required}
        pattern={pattern}
        onChange={onChangeInput}
        onBlur={handleFocus}
        onFocus={() => name === "confirmPassword" && setFocused(true)}
        focused={focused.toString()}
        className="user__input"
      />
      {isErrorMessageVisible && (
        <span className="form__input-error">{errorMessage}</span>
      )}
    </div>
  );
}
