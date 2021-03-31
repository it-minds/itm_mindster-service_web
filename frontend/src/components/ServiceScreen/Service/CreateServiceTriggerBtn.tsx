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
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import ApplicationForm from "components/Forms/Application/ApplicationForm";
import ServiceForm from "components/Forms/Service/ServiceForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genServiceClient } from "services/backend/apiClients";
import {
  CreateApplicationCommand,
  CreateServiceCommand,
  ServiceDto
} from "services/backend/nswagts";

const CreateServiceTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchServices, setCurrService } = useContext(ServiceViewContext);
  const toast = useToast();

  const addService = useCallback(async (form: ServiceDto) => {
    const client = await genServiceClient();
    try {
      await client.createService(
        new CreateServiceCommand({
          service: form
        })
      );
      toast({
        description: "Service was added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PostService responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    fetchServices();
  }, []);

  return (
    <>
      <Button
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        bgColor="green"
        onClick={onOpen}>
        Create new Service
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Service</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ServiceForm submitCallback={addService} />
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

export default CreateServiceTriggerBtn;
