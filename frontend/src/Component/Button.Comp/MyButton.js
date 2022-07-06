/** @format */

import React from "react";
import { Button, Box, Spinner } from "@chakra-ui/react";

const MyButton = (props) => {
  return (
    <Box className='btn_container'>
      <Button
        className={props.disable ? "auth_btn disable" : "auth_btn"}
        disabled={props.disable}
        onClick={props.handleRegister}>
        {props.loading ? <Spinner /> : <>{props.text}</>}
      </Button>
    </Box>
  );
};

export default MyButton;
