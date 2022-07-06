/** @format */

import { Text, Box, Avatar } from "@chakra-ui/react";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { MyState } from "../../Context/Context";
import Layout from "../../Layout/Layout";

const Profile = () => {
  const { setPageType } = MyState();
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  useLayoutEffect(() => {
    setPageType("profile");
  });

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:5010/api/user/",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
        setMsg(error.message);
      });
  }, [localStorage.getItem("token")]);

  return (
    <Layout>
      {user ? (
        <Box className='profile_container'>
          <Box className='profile_avatar_container'>
            <Avatar src={user.profile_img} className='profile_avatar' />
          </Box>

          <Box className='profile_info'>
            <Text className='name'>{user.name}</Text>
            <Text className='username'>{user.username}</Text>
          </Box>

          <Box className='task_count_box'>
            {/* Task */}
            <Box className='task_card task'>
              <Text className='card_header'>Tasks</Text>
              <Text className='card_num'>{user.tasks.length}</Text>
            </Box>

            {/*Completed Task  */}
            <Box className='task_card complete'>
              <Text className='card_header'>Complete</Text>
              <Text className='card_num'>{user.completed.length}</Text>
            </Box>
            {/* Pending Task */}
            <Box className='task_card pendding'>
              <Text className='card_header'>Tasks</Text>
              <Text className='card_num'>{user.pendding.length}</Text>
            </Box>
          </Box>
        </Box>
      ) : (
        <Text>{msg}</Text>
      )}
    </Layout>
  );
};

export default Profile;
