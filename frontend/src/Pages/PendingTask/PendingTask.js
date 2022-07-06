/** @format */

import React, { useEffect, useLayoutEffect } from "react";
import Layout from "../../Layout/Layout";
import { MyState } from "../../Context/Context";
import { Text } from "@chakra-ui/react";
import TaskComp from "../../Component/Task.Comp/TaskComp";

const PendingTask = () => {
  const { call, pendingTasks, setPendingTasks, setPageType } = MyState();

  useLayoutEffect(() => {
    setPageType("primary");
  });

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:5010/api/task/pending",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setPendingTasks(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [call]);

  return (
    <Layout>
      {(pendingTasks || []).length > 0 ? (
        <>
          {pendingTasks.map((task) => (
            <TaskComp key={task._id} taskData={task} />
          ))}
        </>
      ) : (
        <Text className='res_msg'>Loading</Text>
      )}
    </Layout>
  );
};

export default PendingTask;
