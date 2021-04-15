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
import MarkdownTwoSplit from "components/Markdown/MarkdownTwoSplit";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateServiceCommand, ServiceDto } from "services/backend/nswagts";

const CreateServiceTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setNewCurrService } = useContext(ServiceViewContext);
  const [value, setValue] = useState("# My Service\n");
  const toast = useToast();

  function convertToIdentifier(title: string): string {
    //TODO Replace with proper string filtering and regex (Pls help me Martin)
    console.log(title);
    title = title.toLowerCase();
    title = title.replaceAll(/[^a-z .]/g, "");
    title = title.replaceAll(".", "_");
    title = title.replaceAll(" ", "_");
    title = title.replaceAll(/_+/g, "_");
    return title;
  }

  const addService = useCallback(async (title: string, description: string) => {
    const client = await genServiceClient();
    try {
      const serviceId = await client.createService(
        new CreateServiceCommand({
          service: new ServiceDto({
            title: title,
            description: description,
            serviceIdentifier: convertToIdentifier(title)
          })
        })
      );
      setNewCurrService(serviceId);
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

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Service</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <MarkdownTwoSplit value={value} onValueChange={setValue} onSave={addService} />
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
