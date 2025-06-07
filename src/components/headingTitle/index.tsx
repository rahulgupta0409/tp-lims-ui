import React from "react";
import "./style.scss";

interface HeadingTitleProps {
  title?: string;
  subtitle?: string;
  center?: boolean;
  onClick?: () => void;
  className?: string;
}

const HeadingTitle: React.FC<HeadingTitleProps> = ({
  title,
  subtitle,
  center,
  onClick,
  className = "",
}) => {
  return (
    <div className={`heading-container ${className}`} onClick={onClick}>
      <div className={center ? "text-center" : "text-start"}>
        <div className="heading-title">{title}</div>
        <div className="heading-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};

export default HeadingTitle;
