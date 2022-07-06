/** @format */

import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../Layout/Layout";
import { Box, Text } from "@chakra-ui/react";
import { MyState } from "../../Context/Context";
import "react-toastify/dist/ReactToastify.css";
import TaskComp from "../../Component/Task.Comp/TaskComp";

const Home = () => {
  const { tasks, setTasks, setUserId, call, setPageType } = MyState();

  useLayoutEffect(() => {
    setPageType("primary");
  });

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:5010/api/task",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
        setTasks(response.data.tasks);
        setUserId(response.data.userId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [call]);

  return (
    <Layout>
      <Box>
        {(tasks || []).length > 0 ? (
          <Box>
            {tasks.map((task) => (
              <TaskComp taskData={task} key={task._id} />
            ))}
          </Box>
        ) : (
          <Text className='res_msg'>Loading</Text>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
