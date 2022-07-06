/** @format */

import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import MyInput from "../../Component/Input.Comp/MyInput";
import MyButton from "../../Component/Button.Comp/MyButton";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyState } from "../../Context/Context";

const Signup = () => {
  const { setUser } = MyState();
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!logUser.trim() || !password.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [logUser, password]);

  const handleNameChange = (e) => {
    setLogUser(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      logUser: logUser,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:5010/api/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("User", JSON.stringify(response.data.user));
        setUser(response.data.user);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.status === 200) {
          setLoading(false);
          setDisable(true);
          toast.success("Login Successfull");
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.msg);
        setLoading(false);
        setDisable(true);
        setLogUser("");
        setPassword("");
      });
  };

  return (
    <Box className='auth_container'>
      <Box className='box'>
        <Text className='auth_header'>Login</Text>
        <Box className='form_container'>
          {/* Username */}
          <MyInput
            type='text'
            value={logUser}
            onChange={handleNameChange}
            placeholder='Enter username or email'
          />
          {/* Password */}
          <MyInput
            type='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter password'
          />
        </Box>
        <MyButton
          text='Signup'
          disable={disable}
          loading={loading}
          handleRegister={handleRegister}
        />
        <Text className='footer_text'>
          Don't have an account?{" "}
          <Link to='/signup' className='link'>
            Signup
          </Link>
        </Text>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Signup;
