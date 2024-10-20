import { Button, TextField } from "@mui/material";
import { useState } from "react";
import UserManagement from "../../Services/User";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
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
    <div className="container mx-auto pt-20  text-[#515151]">
      <p className="uppercase font-bold text-[20px] mb-12">Register</p>
      <div className="ml-24">
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
            type="password"
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
            onClick={handleRegister}
          >
            Register
          </Button>
          <p className="uppercase underline text-[11px] mt-3">Log in</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
