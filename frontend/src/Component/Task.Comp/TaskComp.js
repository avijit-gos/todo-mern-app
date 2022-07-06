/** @format */

import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Textarea,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./Task.css";
import { timeDifference } from "../../utils/time";
import { FiMoreHorizontal } from "react-icons/fi";
import { VscPinned } from "react-icons/vsc";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import {
  MdOutlineIncompleteCircle,
  MdOutlinePendingActions,
} from "react-icons/md";
import ModalComp from "../Modal.comp/ModalComp";
import { MyState } from "../../Context/Context";
import { useToast } from "@chakra-ui/react";

const TaskComp = ({ taskData }) => {
  const toast = useToast();
  const { setCall } = MyState();
  const [openPinnedModal, setOpenPinnedModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [openPenddingModal, setOpenPenddingModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!title.trim() || !body.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [title, body]);

  // Handle pinned modal...
  const handlePinnedModal = (taskId) => {
    setId(taskId);
    setOpenPinnedModal(true);
  };
  // Handle pinned task...
  const handlePinnedTask = () => {
    var axios = require("axios");

    var config = {
      method: "patch",
      url: "http://localhost:5010/api/task/pinned/" + id,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response);
        setCall((prev) => !prev);
        if (response.status === 200) {
          setOpenPinnedModal(false);
          // toast.success(response.data.msg);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
        toast.error(error.message);
        setOpenPinnedModal(false);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  // Remove pinned task...
  const handleRemovePinnedTask = () => {
    var axios = require("axios");

    var config = {
      method: "patch",
      url: "http://localhost:5010/api/task/unpinned/" + id,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setCall((prev) => !prev);
        if (response.status === 200) {
          setOpenPinnedModal(false);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        // console.log(error)
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setOpenPinnedModal(false);
      });
  };

  // Handle delete modal...
  const handleDeleteModal = (taskId) => {
    setOpenDeleteModal((p) => !p);
    setId(taskId);
  };
  // Handle delete task...
  const deleteTaskHandler = (id) => {
    var axios = require("axios");

    var config = {
      method: "delete",
      url: "http://localhost:5010/api/task/delete/" + id,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCall((prev) => !prev);
        if (response.status === 200) {
          setOpenDeleteModal(false);
          // toast.success(response.data.msg);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
        setOpenDeleteModal(false);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // Handle edit modal...
  const handleEditModal = (taskId, taskTitle, taskBody) => {
    setOpenEditModal(true);
    setId(taskId);
    setTitle(taskTitle);
    setBody(taskBody);
    console.log(taskTitle);
  };
  // Handle edit task...
  const handleEditTask = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      title: title,
      body: body,
    });

    var config = {
      method: "put",
      url: "http://localhost:5010/api/task/edit/" + id,
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
        if (response.status === 200) {
          setCall((p) => !p);
          setOpenEditModal(false);
          // toast.success(response.data.msg);
          setTitle("");
          setBody("");
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setOpenEditModal(false);
        setTitle("");
        setBody("");
      });
  };

  // Handle complete task modal...
  const handleCompleteTaskModal = (taskId) => {
    setId(taskId);
    setOpenCompleteModal(true);
  };
  // Handle complete task..
  const handleCompleteTask = () => {
    var axios = require("axios");

    var config = {
      method: "put",
      url: "http://localhost:5010/api/task/complete/" + id,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          setCall((p) => !p);
          setOpenCompleteModal(false);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setOpenCompleteModal(false);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "message",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // Handle Pending task modal...
  const pendingTaskModal = (taskId) => {
    setOpenPenddingModal(true);
    setId(taskId);
  };

  const handlePendingTask = () => {
    var axios = require("axios");

    var config = {
      method: "put",
      url: "http://localhost:5010/api/task/pendding/" + id,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          setCall((p) => !p);
          setOpenPenddingModal(false);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setOpenPenddingModal(false);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "message",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const resolveHandler = () => {
    var axios = require("axios");

    var config = {
      method: "put",
      url: "http://localhost:5010/api/task/resolve/" + id,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          setCall((p) => !p);
          setOpenPenddingModal(false);
          toast({
            title: "Success",
            description: `${response.data.msg}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setOpenPenddingModal(false);
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "message",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box className='task_container'>
      {/* PINNED MODAL */}
      {openPinnedModal && (
        <ModalComp
          isOpen={openPinnedModal}
          isCLose={setOpenPinnedModal}
          title={taskData.imp ? "Remove importent task" : "Importent task"}
          body={
            taskData.imp
              ? "Do you want to remove this task from importent list ?"
              : "Do you want to set this task as importent ?"
          }
          footer={
            <Button
              className='post_btn'
              onClick={
                taskData.imp ? handleRemovePinnedTask : handlePinnedTask
              }>
              Save
            </Button>
          }
        />
      )}

      {/* DELETE MODAL */}
      {openDeleteModal && (
        <ModalComp
          isOpen={openDeleteModal}
          isCLose={setOpenDeleteModal}
          title={"Delete task"}
          body={"Do you want to delete this task ?"}
          footer={
            <Button className='post_btn' onClick={() => deleteTaskHandler(id)}>
              Delete
            </Button>
          }
        />
      )}

      {/* EDIT MODAL */}
      {openEditModal && (
        <ModalComp
          isOpen={openEditModal}
          isCLose={setOpenEditModal}
          title={"Edit task"}
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
              className='post_btn'
              onClick={handleEditTask}
              disabled={disable}>
              Edit
            </Button>
          }
        />
      )}

      {/* Complete task modal */}
      {openCompleteModal && (
        <ModalComp
          isOpen={openCompleteModal}
          isCLose={setOpenEditModal}
          title={"Complete task"}
          body={"Did you complete this task?"}
          footer={
            <Button className='post_btn' onClick={handleCompleteTask}>
              Save
            </Button>
          }
        />
      )}

      {/* Pending MODAL */}
      {openPenddingModal && (
        <ModalComp
          isOpen={openPenddingModal}
          isCLose={setOpenPenddingModal}
          title={taskData.pendding ? <>Resolve task</> : <>Pending task</>}
          body={
            taskData.pendding
              ? "Do you want to resolve this task?"
              : "Do you want to post-pond  this task?"
          }
          footer={
            <Button
              className='post_btn'
              onClick={taskData.pendding ? resolveHandler : handlePendingTask}>
              Save
            </Button>
          }
        />
      )}
      <Box className='task_header'>
        <Box className='task_box'>
          <Text className={taskData.imp ? "title imp_title" : "title"}>
            {taskData.title}
          </Text>
          <Text className='time'>
            {timeDifference(new Date(), new Date(taskData.createdAt))}
          </Text>
          {taskData.complete && (
            <Tag className='tag complete_tag'>Completed</Tag>
          )}
          {taskData.imp && <Tag className='tag imp_tag'>Importent</Tag>}
          {taskData.pendding && <Tag className='tag Pen_tag'>Pending</Tag>}
        </Box>

        {!taskData.originalId && (
          <Menu>
            <MenuButton as={Button} className='menu_btn'>
              <FiMoreHorizontal />
            </MenuButton>
            <MenuList>
              {/* PINNED MENU */}
              <MenuItem
                className='menu_item'
                onClick={() => handlePinnedModal(taskData._id)}>
                <span className='=icon'>
                  <VscPinned />
                </span>
                <span className='menu_text'>
                  {taskData.imp ? <>Remove</> : <>Pinned</>}
                </span>
              </MenuItem>

              {/* DELETE MENU */}
              <MenuItem
                className='menu_item'
                onClick={() => handleDeleteModal(taskData._id)}>
                <span className='=icon'>
                  <BsTrash />
                </span>
                <span className='menu_text'>Delete</span>
              </MenuItem>

              {/* EDIT MENU */}
              {!taskData.complete && (
                <MenuItem
                  className='menu_item'
                  onClick={() =>
                    handleEditModal(taskData._id, taskData.title, taskData.body)
                  }>
                  <span className='=icon'>
                    <AiOutlineEdit />
                  </span>
                  <span className='menu_text'>Edit</span>
                </MenuItem>
              )}

              {/* COMPLETE TASK MENU */}
              {!taskData.complete && (
                <MenuItem
                  className='menu_item'
                  onClick={() => handleCompleteTaskModal(taskData._id)}>
                  <span className='=icon'>
                    <MdOutlineIncompleteCircle />
                  </span>
                  <span className='menu_text'>Completed</span>
                </MenuItem>
              )}

              {/* PENDING TASK MENU */}
              {!taskData.complete && (
                <MenuItem
                  className='menu_item'
                  onClick={() => pendingTaskModal(taskData._id)}>
                  <span className='=icon'>
                    <MdOutlinePendingActions />
                  </span>
                  <span className='menu_text'>
                    {taskData.pendding ? <>Resolve</> : <>Pendding</>}
                  </span>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Box>

      {/* Task Body */}
      <Box className='task_body'>
        <Text className={taskData.imp ? "body imp_body" : "body"}>
          {taskData.body}
        </Text>
      </Box>
    </Box>
  );
};

export default TaskComp;
