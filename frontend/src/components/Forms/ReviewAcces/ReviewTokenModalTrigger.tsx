import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import ReviewTokenForm from "components/Forms/ReviewAcces/ReviewTokenForm";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

type Props = {
  token: AppTokenIdDto;
};

const ReviewTokenModalTrigger: FC<Props> = ({ token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve or decline actions for token: {token.id} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewTokenForm token={token} />
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

export default ReviewTokenModalTrigger;
