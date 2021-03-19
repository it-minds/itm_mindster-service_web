import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import { ApplicationContext } from "contexts/ApplicationContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationIdDto, UpdateApplicationCommand } from "services/backend/nswagts";

type Props = {
  application: ApplicationIdDto;
};

const UpdateApplicationTriggerBtn: FC<Props> = ({ application }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchData } = useContext(ApplicationContext);
  const toast = useToast();

  const updateApplication = useCallback(async metaData => {
    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.updateApplication(
        metaData.id,
        new UpdateApplicationCommand({
          application: metaData
        })
      );
      toast({
        description: "Application was updated",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PutApplication responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Button justifyContent="left" isFullWidth={true} size="sm" variant="ghost" onClick={onOpen}>
        Update application
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm
              AppMetaData={application}
              submitCallback={updateApplication}></ApplicationForm>
          </ModalBody>
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
export default UpdateApplicationTriggerBtn;
