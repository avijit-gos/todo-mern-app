/** @format */

import { Box, Button } from "@chakra-ui/react";
import React, { useState, useLayoutEffect } from "react";
import { MyState } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import ProfileSettings from "../../Component/Settings/ProfileSettings";
import PrivacySettings from "../../Component/Settings/PrivacySettings";

const Settings = () => {
  const { setPageType } = MyState();
  const [profileIcon, setProfileIcon] = useState(true);
  const [privacyIcon, setPrivacyIcon] = useState(true);

  useLayoutEffect(() => {
    setPageType("settings");
  });

  return (
    <Layout>
      <Box className='settings_container'>
        {/* Profile Settings */}
        <Button
          className='settings_btn'
          onClick={() => setProfileIcon((prev) => !prev)}>
          <span className='settings_btn_text'>Profile Settings</span>
          <span className='settings_btn_icon'>
            {profileIcon ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}
          </span>
        </Button>
        {!profileIcon && <ProfileSettings />}

        {/* Privacy Settings */}
        <Button
          className='settings_btn'
          onClick={() => setPrivacyIcon((prev) => !prev)}>
          <span className='settings_btn_text'>Privacy Settings</span>
          <span className='settings_btn_icon'>
            {privacyIcon ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}
          </span>
        </Button>
        {!privacyIcon && <PrivacySettings setPrivacyIcon={setPrivacyIcon} />}
      </Box>
    </Layout>
  );
};

export default Settings;
