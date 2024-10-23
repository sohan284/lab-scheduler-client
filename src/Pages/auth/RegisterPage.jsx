import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons
import UserManagement from "../../Services/User";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleRegister = () => {
    const userEmail = formData.username.includes("@g.clemson.edu")
      ? formData.username
      : `${formData.username}@g.clemson.edu`;
    const data = {
      username: userEmail,
      password: formData.password,
    };
    UserManagement.upsertUser(data).then(() => navigate("/login"));
  };

  return (
    <div className="flex justify-center">
      <div className="pt-20 text-[#515151]">
        <p className="uppercase text-center lg:text-start font-bold text-[20px] mb-12">
          Register
        </p>
        <div className="lg:ml-24 max-w-[300px] lg:max-w-full">
          <div className="flex items-center mb-[6px]">
            <h1 className="uppercase text-nowrap font-medium text-[14px] mr-[20px]">
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
                    onClick={() => setShowPassword(!showPassword)} // Toggle function
                    style={{
                      backgroundColor: "transparent",
                      color: "#522C80",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />} {/* Show/Hide icon */}
                  </Button>
                ),
              }}
            />
          </div>
        </div>
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <p
              onClick={() => navigate("/login")}
              className="uppercase cursor-pointer underline text-[11px] mt-3"
            >
              Log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
