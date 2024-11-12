import { Alert, Button, Dialog, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserManagement from "../../Services/User";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons
import toast from "react-hot-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  const [passwordScreen,setPasswordScreen] = useState(false)

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
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setErrorMsg(null);
    setOtpScreen(false);
    setPasswordScreen(false);
    setUsername("");
    setPassword('');
  };
  const handleLogin = async () => {
    if (!validateForm()) return; // Stop if form is invalid

    // const userEmail = username.includes("@g.clemson.edu")
    //   ? username
    //   : `${username}@g.clemson.edu`;
    const userEmail = username.includes("@g.clemson.edu")
      ? username
      : `${username}@g.clemson.edu`;

    setErrorMsg(null);

    try {
      const response = await UserManagement.loginUser(userEmail, password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);

        if (response.message === "Login successful") {
          navigate("/");
          localStorage.setItem("tab", "Users");
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
  const handleSendOtp = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await UserManagement.sendOtp(`${username}@g.clemson.edu`,"forgotPassword");
      toast.success("OTP sent to your email.");
      setOtpScreen(true);
      setPassword('');
    } catch (error) {
      setErrorMsg(` ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value, event) => {
    if (value.length > 1) return; // Allow only one character

    const newOtp = [...otp];

    if (event.key === "Backspace") {
      if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const handleVerifyOtp = async () => {
    setErrorMsg(null);
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setErrorMsg("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      const isValid = await UserManagement.verifyOtp(
        `${username}@g.clemson.edu`,
        otpString
      );
      if (isValid) {
        setOtpScreen(false)
        setPasswordScreen(true)
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg(`${error.response?.data?.message}`);
      toast.error(` ${error.response?.data?.message}`);
    }
  };
  const handleChangePassword = async () => {
    setLoading(true);
    if (!password) {
      setErrorMsg("Password cannot be empty.");
      setLoading(false)
      return false;
    }
    const userEmail = `${username}@g.clemson.edu`;
    const data = {
      username: userEmail,
      password: password,
    };

    try {
      const res = await UserManagement.upsertUser(data);
      if (res.success) {
        handleCloseDialog()
        toast.success("Password changed successfully!")
      } else {
        setErrorMsg(res.message);
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="pt-20 text-[#515151]">
        <p className="uppercase text-center lg:text-start font-bold text-[20px] mb-12">
          Log in
        </p>
        <div className="lg:ml-24 max-w-[350px] lg:max-w-full">
          <div className="flex items-center mb-[6px]">
            <h1 className="uppercase text-nowrap font-medium text-[15px] mr-[20px]">
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
            <h1 className="text-nowrap font-medium text-[15px] ml-[10px]">
              @g.clemson.edu
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <h1 className="uppercase text-nowrap font-medium text-[15px] mr-[20px]">
              Password
            </h1>
            <TextField
              size="small"
              type={showPassword ? "text" : "password"} 
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
          <p
            onClick={() => setIsDialogOpen(true)}
            className="uppercase cursor-pointer underline text-[11px] mt-3 text-right text-blue-500"
          >
            Forgot Password?
          </p>
        </div>
        {errorMsg && (
          <p className="text-center mt-3 text-red-600 text-[15px]">
            {errorMsg}
          </p>
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
      <Dialog
        PaperProps={{
          style: {
            width: "600px", 
            height: "300px", 
            padding: "20px",
            marginTop: "-120px",
          },
        }}
        maxWidth="lg"
        open={isDialogOpen}
        onClose={() => handleCloseDialog()}
      >
        {otpScreen ? (
          <div className="p-4">
            <label className="block my-5 text-gray-500 text-sm">
              Enter Otp<span className="text-red-500  text-xs">*</span>
            </label>
            <div className="flex items-center mb-[6px]">
              <div className="flex justify-between mt-2">
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    id={`otp-input-${index}`}
                    size="small"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value, e)}
                    onKeyDown={(e) => handleOtpChange(index, e.target.value, e)}
                    className="w-[15%] text-sm bg-purple-100"
                  />
                ))}
              </div>
            </div>
            {errorMsg && (
              <Alert severity="error" className="mt-3">
                {errorMsg}
              </Alert>
            )}
            <div
              className="w-full text-center p-3 hover:opacity-85 cursor-pointer bg-[#522C80] text-white mt-5 rounded"
              onClick={handleVerifyOtp}
              onKeyPress={handleKeyPress}
              tabIndex={0}
            >
              {loading ? "Loading..." : "Verify Otp"}
            </div>
          </div>
        ) : passwordScreen ?   <div className="p-4">
        <label className="block my-5 text-gray-500 text-sm">
          Enter New Password<span className="text-red-500  text-xs">*</span>
        </label>
        <div className="flex items-center mb-[6px]">
        <TextField
              size="small"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                height: "35px",
                width: "100%",
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
        {errorMsg && (
              <Alert severity="error" className="mt-3">
                {errorMsg}
              </Alert>
            )}
        <div
          className="w-full text-center p-3 hover:opacity-85 cursor-pointer bg-[#522C80] text-white mt-5 rounded"
          onClick={handleChangePassword}
          onKeyPress={handleKeyPress}
          tabIndex={0}
        >
          {loading ? "Loading..." : "Change Password"}
        </div>
      </div> : (
          <div className="p-4">
            <label className="block my-5 text-gray-500 text-sm">
              Enter Username<span className="text-red-500  text-xs">*</span>
            </label>
            <div className="flex items-center mb-[6px]">
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
              <h1 className="text-nowrap font-medium text-[15px] ml-[10px]">
                @g.clemson.edu
              </h1>
            </div>
            {errorMsg && (
              <Alert severity="error" className="mt-3">
                {errorMsg}
              </Alert>
            )}
            <div
              className="w-full text-center p-3 hover:opacity-85 cursor-pointer bg-[#522C80] text-white mt-5 rounded"
              onClick={handleSendOtp}
              onKeyPress={handleKeyPress}
              tabIndex={0}
            >
              {loading ? "Loading..." : "Send OTP"}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default LoginPage;
