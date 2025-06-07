import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, LinearProgress } from "@mui/material";
import Logo from "../../assets/logo-nobg.png";
import HeadingTitle from "../../components/headingTitle";
import Input from "../../components/input";
import { CustomButton } from "../../components/button";
import Modal from "../../components/modal";
import "./style.scss";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpModal, setIsOtpModal] = useState(false);
  const [otp, setOtp] = useState(0);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleValidateClick = async () => {
    const response = await fetch(
      `http://localhost:8091/v1/auth/validateOtp?otp=${otp}`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Network response was not ok.");
    const data = await response.json();
    if (data?.fullName) {
      setIsOtpModal(false);
      navigate("/");
    }
  };

  const handleOnChange = (param: string, value: any) => {
    if (param === "emailId") setEmailId(value);
    if (param === "username") setUsername(value);
    if (param === "fullName") setFullName(value);
    if (param === "password") setPassWord(value);
    if (param === "confirmPassword") setConfirmPassword(value);
  };

  const handleOnClick = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8091/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        emailId,
        username,
        fullName,
        password,
        confirmPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Network response was not ok.");
    const data = await response.json();
    setUserData(data);
    setEmailId("");
    setUsername("");
    setFullName("");
    setPassWord("");
    setConfirmPassword("");
    setIsOtpModal(true);
  };

  if (isOtpModal) {
    return (
      <Modal
        isOpen={isOtpModal}
        onClose={() => setIsOtpModal(false)}
        title="OTP"
        secondaryAction="submit"
        secondaryActionLabel="submit"
        body={
          <>
            <Input
              className="otp-input"
              name="otp"
              type="text"
              placeholder="Enter the OTP..."
              value={otp}
              onChange={(e: any) => setOtp(e.target.value)}
            />
            <div>
              <Button className="otp-submit-button" onClick={handleValidateClick}>
                Submit
              </Button>
            </div>
          </>
        }
      />
    );
  }

  return (
    <>
      <LinearProgress variant="determinate" value={62} />
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-header">
            <HeadingTitle
              title="Welcome to Tilak"
              subtitle="Please create an account from here!"
              center
            />
            <img src={Logo} className="signup-logo" alt="Logo" />
          </div>

          <Input
            label="Email"
            name="emailId"
            type="email"
            placeholder="Email"
            value={emailId}
            onChange={(e) => handleOnChange("emailId", e.target.value)}
          />
          <Input
            label="Username"
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => handleOnChange("username", e.target.value)}
          />
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => handleOnChange("fullName", e.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleOnChange("password", e.target.value)}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleOnChange("confirmPassword", e.target.value)}
          />
          <CustomButton type="submit" label="SIGNUP" onClick={handleOnClick} disabled={!emailId || !username || !password || !confirmPassword}/>

          <div className="signup-footer">
            <div>Already have an account?</div>
            <Button className="signup-footer-button" onClick={() => navigate("/")}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
