import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
        w="250px"
        h="200px"
        shadow="xl"
        borderWidth="1px"
        borderRadius="lg"
        p="3">
        <Heading fontSize="xl">{service.title}</Heading>
        <Heading mt="6" fontSize="md">
          {service.serviceIdentifier}
        </Heading>
        <Heading mt="6" fontSize="sm">
          Amount of actions: {service.actions.length}
        </Heading>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Service: {service.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Container w="4xl" maxW="full">
                <MarkdownViewer value={service.description} />
                <RequestActions service={service}></RequestActions>
              </Container>
            </Center>
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
