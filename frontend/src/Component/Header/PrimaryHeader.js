/** @format */
import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { NavLink, Link } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import { BiUser } from "react-icons/bi";
import {
  IoSettingsOutline,
  IoCreateOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import ModalComp from "../Modal.comp/ModalComp";
import { MyState } from "../../Context/Context";

const PrimaryHeader = () => {
  const toast = useToast();
  const { setCall, user } = MyState();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!title.trim() || !body.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [title, body]);

  const handlePostClick = () => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      title: title,
      body: body,
    });

    var config = {
      method: "post",
      url: "http://localhost:5010/api/task",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response);
        if (response.status === 201) {
          setLoading(false);
          setDisable(true);
          setTitle("");
          setBody("");
          setOpenTaskModal(false);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setCall((prev) => !prev);
        }
      })
      .catch(function (error) {
        // console.log(error);
        setTitle("");
        setBody("");
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const openTaskModalHandler = () => {
    setOpenTaskModal((prev) => !prev);
  };
  return (
    <>
      {user && (
        <Box className='primary_header'>
          {openTaskModal && (
            <ModalComp
              isOpen={openTaskModal}
              isCLose={setOpenTaskModal}
              title='Create a new task'
              body={
                <Box>
                  <Input
                    type='text'
                    placeholder='Enter title'
                    className='input_filed'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    type='text'
                    placeholder='Enter task details'
                    className='input_textarea'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}></Textarea>
                </Box>
              }
              footer={
                <Button
                  className={disable ? "post_btn post_btn_disable" : "post_btn"}
                  disabled={disable}
                  onClick={handlePostClick}>
                  {loading ? <Spinner /> : <>Save</>}
                </Button>
              }
            />
          )}
          {/* LOGO */}
          <Img src={Logo} className='logo' />

          {/* NAVBAR */}
          <Box className='navbar'>
            <NavLink to='/home' className={"nav_item"}>
              All
            </NavLink>
            <NavLink to='/complete' className={"nav_item"}>
              Completed
            </NavLink>
            <NavLink to='/pending' className={"nav_item"}>
              Remainig
            </NavLink>
          </Box>

          {/* HEADER MENU */}
          <Box className='menu'>
            <Menu>
              <MenuButton as={Button} className='menu_btn'>
                <Avatar src={user.profile_img} className='avatar' />
              </MenuButton>
              <MenuList>
                {/* Profile */}
                <Link to='/profile'>
                  <MenuItem className='menu_item'>
                    <span className='icon'>
                      <BiUser />
                    </span>
                    Profile
                  </MenuItem>
                </Link>

                {/* Settings */}
                <Link to='/settings'>
                  <MenuItem className='menu_item'>
                    <span className='icon'>
                      <IoSettingsOutline />
                    </span>
                    Settings
                  </MenuItem>
                </Link>

                {/* Create Task */}
                <MenuItem className='menu_item' onClick={openTaskModalHandler}>
                  <span className='icon'>
                    <IoCreateOutline />
                  </span>
                  Create Task
                </MenuItem>

                {/* Logout */}
                <MenuItem className='menu_item'>
                  <span className='icon'>
                    <IoLogOutOutline />
                  </span>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PrimaryHeader;
