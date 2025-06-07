import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginSuccessAsync } from "../../actions";
import HeadingTitle from "../../components/headingTitle";
import Input from "../../components/input";
import { useAppDispatch } from "../../customHooks/useDispatch";
import { CustomButton } from "../../components/button";
import "./style.scss";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleOnChange = (param: "username" | "password", value: string): void => {
        if (param === "username") {
            setUsername(value);
        } else if (param === "password") {
            setPassword(value);
        }
    };

    const handleOnClick = async (): Promise<void> => {
        const data = { username, password };

        dispatch(loginSuccessAsync(data, () => {
            setUsername("");
            setPassword("");
            navigate("/home");
        })
        );
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <HeadingTitle title="Welcome Back" subtitle="Login to your Account!" center />

                <Input
                    label="User Name"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => handleOnChange("username", e.target.value)}
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleOnChange("password", e.target.value)}
                />

                <CustomButton type="submit" label="LOGIN" onClick={handleOnClick} />

                <div className="signup-redirect">
                    <div className="signup-text">Don't have an account?</div>
                    <Button
                        className="signup-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;