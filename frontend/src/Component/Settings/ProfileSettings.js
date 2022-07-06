/** @format */

import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  Button,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { IoCamera } from "react-icons/io5";
import ModalComp from "../Modal.comp/ModalComp";
import { useToast } from "@chakra-ui/react";
import { MyState } from "../../Context/Context";
import MyInput from "../Input.Comp/MyInput";

const ProfileSettings = () => {
  const toast = useToast();
  const { user, setUser, setCall } = MyState();
  const [openProfileModal, setProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [imgPrev, setImgPrev] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [name, setName] = useState(user.name || "");

  const handleFileChange = (e) => {
    setImgPrev(URL.createObjectURL(e.target.files[0]));
    setProfileImage(e.target.files[0]);
    if (imgPrev !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleImageUpload = () => {
    setIsLoading(true);
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("profile_img", profileImage);

    var config = {
      method: "post",
      url: "http://localhost:5010/api/user//upload/profile-image",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        setDisable(true);
        setProfileModal(false);
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("User", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setCall((prev) => !prev);
      })
      .catch(function (error) {
        console.log(error);
        toast({
          title: "Success",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleProfileUpdate = () => {
    setIsLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      name: name,
      username: username,
    });

    var config = {
      method: "put",
      url: "http://localhost:5010/api/user/update/profile",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("User", JSON.stringify(response.data.user));
        setUser(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        toast({
          title: "Error",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      {user ? (
        <>
          {openProfileModal && (
            <ModalComp
              isOpen={openProfileModal}
              isCLose={setProfileModal}
              body={
                <Box>
                  <Input
                    type='file'
                    className='input_file'
                    onChange={(e) => handleFileChange(e)}
                  />
                  <Box className='modal_avatar'>
                    <Avatar src={imgPrev} className='avatar_prev' />
                  </Box>
                </Box>
              }
              title='Update profile image'
              footer={
                <Button
                  className='btn_settings'
                  // disabled={disable}
                  onClick={handleImageUpload}>
                  {loading ? <Spinner /> : <>Upload</>}
                </Button>
              }
            />
          )}
          <Box className='profile_settings_update'>
            <Accordion defaultIndex={[0]} allowMultiple>
              {/* Profile Image upload */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Profile Image upload
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box className='avatar_container'>
                    <Box className='settings_profile_avatar'>
                      <Avatar
                        src={user.profile_img}
                        className='profile_avatar'
                      />
                      <Button
                        className='profile_settings_image_icon'
                        onClick={() => setProfileModal(true)}>
                        <IoCamera />
                      </Button>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              {/* Profile username and name change */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Profile username and name change
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {user ? (
                    <Box className='settings_box'>
                      <MyInput
                        type='text'
                        value={name}
                        onChange={handleChangeName}
                        placeholder={"Enter username"}
                        className={"input_filed"}
                      />
                      <MyInput
                        type='text'
                        value={username}
                        onChange={handleChangeUsername}
                        placeholder={"Enter username"}
                        className={"input_filed"}
                      />
                      <Box className='btn_container'>
                        <Button
                          className='btn_settings'
                          onClick={handleProfileUpdate}>
                          {loading ? <Spinner /> : <>Save</>}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Text>Loading</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
};

export default ProfileSettings;
