import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserManagement from "../../Services/User";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    if (!username) {
      setErrorMsg("Username cannot be empty.");
      return false;
    }

    if (!password) {
      setErrorMsg("Password cannot be empty.");
      return false;
    }

    return true; // Return true if all validations pass
  };

  const handleLogin = async () => {
    if (!validateForm()) return; // Stop if form is invalid

    const userEmail = username.includes("@g.clemson.edu")
      ? username
      : `${username}@g.clemson.edu`;

    setErrorMsg(null);

    try {
      const response = await UserManagement.loginUser(userEmail, password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        console.log(response);

        if (response.message === "Login successful") {
          navigate("/");
          window.location.reload();
        }
      } else {
        setErrorMsg("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Invalid username or password.");
    }
  };

  // Function to handle keypress and check for 'Enter' key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="pt-20 text-[#515151]">
        <p className="uppercase text-center lg:text-start font-bold text-[20px] mb-12">
          Log in
        </p>
        <div className="lg:ml-24 max-w-[300px] lg:max-w-full">
          <div className="flex items-center mb-[6px]">
            <h1 className="uppercase text-nowrap font-medium text-[14px] mr-[20px]">
              User Name
            </h1>
            <TextField
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                height: "35px",
                width: "191px",
                "& .MuiInputBase-root": {
                  height: "35px",
                },
              }}
              className="text-sm"
            />
            <h1 className="text-nowrap font-medium text-[14px] ml-[10px]">
              @g.clemson.edu
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <h1 className="uppercase text-nowrap font-medium text-[14px] mr-[20px]">
              Password
            </h1>
            <TextField
              size="small"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                height: "35px",
                width: "345px",
                "& .MuiInputBase-root": {
                  height: "35px",
                },
              }}
              className="text-sm"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)} // Toggle function
                    style={{
                      padding: 0,
                      backgroundColor: "transparent",
                      color: "#522C80",
                      minWidth: "0", // Ensure no default width
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    {/* Show/Hide icon */}
                  </Button>
                ),
              }}
            />
          </div>
        </div>
        {errorMsg && (
          <p className="text-center mt-3 text-red-600 text-xs">{errorMsg}</p>
        )}
        <div className="flex justify-center text-center">
          <div>
            <Button
              style={{
                backgroundColor: "#522C80",
                fontSize: "14px",
                fontWeight: "400",
                marginTop: 20,
                paddingInline: 20,
                color: "white",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <p
              onClick={() => navigate("/register")}
              className="uppercase cursor-pointer underline text-[11px] mt-3"
            >
              Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
