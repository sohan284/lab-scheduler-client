import { Alert, Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UserManagement from "../../Services/User";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateForm = () => {
    if (!formData.username) {
      setErrorMsg("Username is required.");
      setLoading(false);
      return false;
    }
    if (!formData.password) {
      setErrorMsg("Password is required.");
      setLoading(false);
      return false;
    } else if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setLoading(false);
      return false;
    }
    setErrorMsg(null);
    setLoading(false);
    return true;
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { username } = formData;
    if (!validateForm()) return;
    try {
      await UserManagement.sendOtp(`${username}@gmail.com`);
      // await UserManagement.sendOtp(`${username}@g.clemson.edu`);
      toast.success("OTP sent to your email.");
      setIsDialogOpen(true);
    } catch (error) {
      setErrorMsg(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Allow only one character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input when a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
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
        `${formData.username}@gmail.com`,
        otpString
      );
      // const isValid = await UserManagement.verifyOtp(
      //   `${formData.username}@g.clemson.edu`,
      //   otpString
      // );
      if (isValid) {
        await handleRegister(); // Proceed to complete sign-up
        setIsDialogOpen(false); // Close the OTP dialog
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg(`Error: ${error.response?.data?.message}`);
      toast.error(`Error: ${error.response?.data?.message}`);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    // const userEmail = formData.username.includes("@g.clemson.edu")
    //   ? formData.username
    //   : `${formData.username}@g.clemson.edu`;
    const userEmail = formData.username.includes("@gmail.com")
      ? formData.username
      : `${formData.username}@gmail.com`;

    const data = {
      username: userEmail,
      password: formData.password,
      role: "student",
    };

    try {
      const res = await UserManagement.upsertUser(data);
      if (res.success) {
        navigate("/login");
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
          Register
        </p>
        <div className="lg:ml-24 max-w-[300px] lg:max-w-full">
          <div className="flex items-center mb-[6px]">
            <h1 className="uppercase text-nowrap font-medium text-[15px] mr-[20px]">
              User Name
            </h1>
            <TextField
              size="small"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      padding: 0,
                      backgroundColor: "transparent",
                      color: "#522C80",
                      minWidth: "0",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
            />
          </div>
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
              onClick={handleSendOtp}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
            <p
              onClick={() => navigate("/login")}
              className="uppercase cursor-pointer underline text-[11px] mt-3"
            >
              Log in
            </p>
          </div>
        </div>

        {/* OTP Dialog */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <div className="p-4">
            <label className="block mt-5  text-gray-500 text-sm">
              Enter OTP<span className="text-red-500 text-xs">*</span>
            </label>
            <div className="flex justify-between mt-2">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-input-${index}`}
                  size="small"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-[15%] text-sm"
                />
              ))}
            </div>
            {errorMsg && (
              <Alert severity="error" className="mt-3">
                {errorMsg}
              </Alert>
            )}
            <div
              className="w-full text-center p-3 hover:opacity-85 cursor-pointer bg-[#522C80] text-white mt-5 rounded"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default RegisterPage;
