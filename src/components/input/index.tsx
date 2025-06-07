import React from "react";
import "./style.scss";

interface InputProps {
  value: string | number;
  placeholder?: string;
  type?: string;
  label?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  className?: string
}

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  type = "text",
  label,
  name,
  onChange,
  autoComplete,
  className
}) => {
  return (
    <div className={"input-row " + className}>
      {label && <div className="label">{label}</div>}
      <input
        className="input"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;