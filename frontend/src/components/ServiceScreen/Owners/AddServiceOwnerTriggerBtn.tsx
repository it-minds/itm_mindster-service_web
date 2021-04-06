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
import ServiceOwnerForm from "components/Forms/Service/ServiceOwnerForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateServiceOwnerCommand, ServiceOwnerDto } from "services/backend/nswagts";

const AddServiceOwnersTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchOwners, currService } = useContext(ServiceViewContext);
  const toast = useToast();

  const addOwners = useCallback(
    async (form: ServiceOwnerDto[]) => {
      const client = await genServiceClient();
      try {
        await client.addServiceOwners(
          currService.id,
          new CreateServiceOwnerCommand({
            serviceOwners: form
          })
        );
        toast({
          description: "Owners were added",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `PostServiceOwners responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        onClose();
        fetchOwners();
      }
    },
    [currService, fetchOwners]
  );

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        bgColor="green">
        Add owners
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add owners to: {currService.title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ServiceOwnerForm submitCallback={addOwners} />
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

export default AddServiceOwnersTriggerBtn;
