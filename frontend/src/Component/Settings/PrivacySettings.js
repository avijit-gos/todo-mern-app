/** @format */

import React, { useEffect, useState } from "react";
import { Box, Button, Spinner } from "@chakra-ui/react";
import MyInput from "../Input.Comp/MyInput";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseTab = () => {
    setCurrentPassword("");
    setNewPassword("");
    setReNewPassword("");
    setDisable(true);
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReNewPassword = (e) => {
    setReNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    setIsLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      currentPassowrd: currentPassword,
      newPassword: newPassword,
      userId: localStorage.getItem("userId"),
    });

    var config = {
      method: "post",
      url: "http://localhost:5010/api/user//change-password",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          localStorage.clear();
          setIsLoading(false);
          setDisable(true);
          navigate("/");
          toast({
            title: "Error",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setDisable(true);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !reNewPassword.trim() ||
      reNewPassword !== newPassword
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [currentPassword, newPassword, reNewPassword]);

  return (
    <Box className='settings_box'>
      <MyInput
        type='password'
        value={currentPassword}
        onChange={handleCurrentPassword}
        placeholder={"Enter current password"}
        className={"input_filed"}
      />
      <MyInput
        type='password'
        value={newPassword}
        onChange={handleNewPassword}
        placeholder={"Enter current password"}
        className={"input_filed"}
      />
      <MyInput
        type='password'
        value={reNewPassword}
        onChange={handleReNewPassword}
        placeholder={"Enter current password"}
        className={"input_filed"}
      />

      <Box className='btn_container'>
        <Button
          className='btn_settings save'
          disabled={disable}
          onClick={handleChangePassword}>
          {isLoading ? <Spinner /> : <>Save</>}
        </Button>
        <Button className='btn_settings cancel' onClick={handleCloseTab}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PrivacySettings;
