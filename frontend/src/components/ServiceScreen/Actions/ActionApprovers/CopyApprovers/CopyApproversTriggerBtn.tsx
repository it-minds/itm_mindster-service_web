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
import React, { FC, useCallback, useContext } from "react";
import { IActionApproverDto, IActionIdDto } from "services/backend/nswagts";

import ActionApproverOverview from "../ActionApproverOverview";
import CopyActionList from "./CopyActionsList";

type Props = {
  currAction: IActionIdDto;
  approversToCopy: IActionApproverDto[];
  submitCallback: (actionId: number, OwnerMetaDataForm: IActionApproverDto[]) => Promise<void>;
};
const CopyApproverTriggerBtn: FC<Props> = ({ currAction, approversToCopy, submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService } = useContext(ServiceViewContext);
  const table: IActionIdDto[] = [];
  currService.actions.forEach(e => {
    if (e.id != currAction.id) table.push(e);
  });

  const handleSubmit = useCallback(
    async (actionIds: number[]) => {
      actionIds.forEach(async actionId => {
        await submitCallback(actionId, approversToCopy);
      });
      onClose();
    },
    [approversToCopy]
  );

  return (
    <>
      <PopoverMenuButton btnText={"Copy approvers to another action"} onClickMethod={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Copy the following approvers from: {currAction.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionApproverOverview approvers={approversToCopy} />
            <CopyActionList tableData={table} submitCallback={handleSubmit} />
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

export default CopyApproverTriggerBtn;
