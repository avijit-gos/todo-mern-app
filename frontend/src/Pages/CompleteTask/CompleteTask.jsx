/** @format */

import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../Layout/Layout";
import { MyState } from "../../Context/Context";
import { Text } from "@chakra-ui/react";
import TaskComp from "../../Component/Task.Comp/TaskComp";

const CompleteTask = () => {
  const { call, completedTasks, setCompletedTasks, setPageType } = MyState();

  useLayoutEffect(() => {
    setPageType("primary");
  });

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:5010/api/task/complete",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if (response.status === 200) {
          setCompletedTasks(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [call]);

  return (
    <Layout>
      {(completedTasks || []).length > 0 ? (
        <>
          {completedTasks.map((task) => (
            <TaskComp key={task._id} taskData={task} />
          ))}
        </>
      ) : (
        <Text className='res_msg'>Loading</Text>
      )}
    </Layout>
  );
};

export default CompleteTask;
