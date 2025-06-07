import React from "react";
import "./style.scss";

type CustomButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({ type = "button", onClick, label, disabled }) => {
  return (
    <div className="custom-btn-row">
      <button className="submit-btn" type={type} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;