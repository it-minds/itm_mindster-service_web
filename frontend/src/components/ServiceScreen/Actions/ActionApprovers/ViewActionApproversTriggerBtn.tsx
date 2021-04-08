import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import PopoverMenuButton from "components/Common/PopoverMenuButton";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useEffectAsync } from "hooks/useEffectAsync";
import React, { FC, useContext, useState } from "react";
import { IActionApproverIdDto, IActionIdDto } from "services/backend/nswagts";

import ActionApproverOverview from "./ActionApproverOverview";

type Props = {
  currAction: IActionIdDto;
  approvers: IActionApproverIdDto[];
};

const ViewActionApproversTriggerBtn: FC<Props> = ({ currAction, approvers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PopoverMenuButton btnText={"View approvers"} onClickMethod={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Action approvers for: {currAction.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionApproverOverview approvers={approvers} />
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewActionApproversTriggerBtn;
