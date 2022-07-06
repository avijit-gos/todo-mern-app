/** @format */

import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import MyInput from "../../Component/Input.Comp/MyInput";
import MyButton from "../../Component/Button.Comp/MyButton";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [name, username, email, password]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      name: name,
      username: username,
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:5010/api/user/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        console.log(JSON.stringify(response.data));
        setLoading(false);
        setDisable(true);
        if (response.status === 201) {
          navigate("/");
          toast.success(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          toast.error(error.response.data.msg);
        }
      });
  };

  return (
    <Box className='auth_container'>
      <Box className='box'>
        <Text className='auth_header'>Registration</Text>
        <Box className='form_container'>
          {/* NAME */}
          <MyInput
            type='text'
            value={name}
            onChange={handleNameChange}
            placeholder='Enter name'
          />
          {/* Email */}
          <MyInput
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email'
          />
          {/* Username */}
          <MyInput
            type='text'
            value={username}
            onChange={handleUsernameChange}
            placeholder='Enter username'
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
          Already have an account?{" "}
          <Link to='/' className='link'>
            Login
          </Link>
        </Text>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Signup;
