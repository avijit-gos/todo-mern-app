/** @format */

import { Box, Button, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React from "react";

const SecondaryHeader = ({ title }) => {
  let navigate = useNavigate();
  return (
    <Box className='secondary_header'>
      <Button className='header_btn' onClick={() => navigate(-1)}>
        <BiArrowBack />
      </Button>
      <Text className='header_text'>{title}</Text>
    </Box>
  );
};

export default SecondaryHeader;
