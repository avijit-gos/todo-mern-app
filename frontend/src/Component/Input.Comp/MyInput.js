/** @format */

import React from "react";
import { Box, Text, Input } from "@chakra-ui/react";

const MyInput = (props) => {
  return (
    <Box className='input_container'>
      <Input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
        className={"input_filed"}
      />
    </Box>
  );
};

export default MyInput;
