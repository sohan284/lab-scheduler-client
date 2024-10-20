import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserManagement from "../../Services/User";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userEmail = username.includes("@g.clemson.edu")
      ? username
      : `${username}@g.clemson.edu`;
    setErrorMsg(null);
    try {
      const response = await UserManagement.loginUser(userEmail, password);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setErrorMsg("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Invalid email or password.");
    }
  };

  // Function to handle keypress and check for 'Enter' key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="container mx-auto pt-20  text-[#515151]">
      <p className="uppercase font-bold text-[20px] mb-12">Log in</p>
      <div className="ml-24">
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
          <h1 className=" text-nowrap font-medium text-[14px] ml-[10px]">
            @g.clemson.edu
          </h1>
        </div>
        <div className="flex items-center">
          <h1 className="uppercase text-nowrap font-medium text-[14px] mr-[20px]">
            Password
          </h1>
          <TextField
            size="small"
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
            className=""
            onClick={handleLogin}
          >
            Login
          </Button>
          <p
            onClick={() => navigate("/register")}
            className="uppercase underline text-[11px] mt-3"
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
