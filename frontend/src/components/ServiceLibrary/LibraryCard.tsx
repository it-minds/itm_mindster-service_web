import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import RequestActions from "components/Forms/RequestActions/RequestActions";
import MarkdownViewer from "components/Markdown/MarkdownViewer";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};

const LibraryCard: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        cursor="pointer"
        _hover={{
          bgColor: hoverBg
        }}
        w="350px"
        h="300px"
        shadow="xl"
        borderWidth="1px"
        borderRadius="lg">
        <Box p="3">
          <Box>
            <Heading fontSize="xl">{service.title}</Heading>
          </Box>
          <Box mt="6">
            <Heading fontSize="md">{service.serviceIdentifier}</Heading>
          </Box>
          <Box mt="6">
            <Heading fontSize="sm">Amount of actions: {service.actions.length}</Heading>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Service: {service.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderWidth="1px" borderRadius="lg" p="5" mt="2">
              <Text>
                <MarkdownViewer value={service.description} />
              </Text>
            </Box>
            <RequestActions service={service}></RequestActions>
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
export default LibraryCard;
