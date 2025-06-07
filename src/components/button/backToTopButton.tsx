import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button } from "@mui/material";
import { ArrowUpwardOutlined } from "@mui/icons-material";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="back-to-top-btn"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUpwardOutlined />
    </Button>
  );
};

export default BackToTopButton;
