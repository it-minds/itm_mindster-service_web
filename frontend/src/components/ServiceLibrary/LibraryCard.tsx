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
  useDisclosure
} from "@chakra-ui/react";
import RequestActions from "components/Forms/RequestActions/RequestActions";
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
        w="300px"
        h="250px"
        shadow="xl"
        borderWidth="1px"
        borderRadius="sm">
        <Box p="6">
          <Box mt="1" as="header">
            <Heading fontSize="xl">{`${service.id} ${service.title}`}</Heading>
          </Box>
          <Box mt="2">{service.description}</Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Request actions of ${service.id}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
