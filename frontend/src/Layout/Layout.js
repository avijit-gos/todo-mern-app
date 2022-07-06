/** @format */

import React, { useEffect, useState } from "react";
import { Box, Button, Input, Textarea, Spinner } from "@chakra-ui/react";
import { MyState } from "../Context/Context";
import PrimaryHeader from "../Component/Header/PrimaryHeader";
import SecondaryHeader from "../Component/Header/SecondaryHeader";

const Layout = ({ children }) => {
  const { pageType, setPageType } = MyState();

  return (
    <Box className='container'>
      {/* Task Modal */}

      {/* HEADER */}
      <Box className='app_header'>
        {pageType === "profile" || pageType === "settings" ? (
          <SecondaryHeader
            title={pageType === "profile" ? <>Profile</> : <>Settings</>}
          />
        ) : (
          <PrimaryHeader />
        )}
      </Box>
      {/* BODY */}
      {children}
    </Box>
  );
};

export default Layout;
