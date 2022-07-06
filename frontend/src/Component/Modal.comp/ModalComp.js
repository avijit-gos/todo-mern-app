/** @format */

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";

const ModalComp = ({ isOpen, isCLose, body, title, footer }) => {
  const onClose = () => {
    isCLose(false);
  };
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalComp;
