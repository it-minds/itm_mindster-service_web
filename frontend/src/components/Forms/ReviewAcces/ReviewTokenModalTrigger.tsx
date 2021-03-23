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
import CurrToken from "components/AppTokens/CurrToken";
import ReviewTokenForm from "components/Forms/ReviewAcces/ReviewTokenForm";
import { ApplicationContext } from "contexts/ApplicationContext";
import React, { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

type Props = {
  token: AppTokenIdDto;
};

const ReviewTokenModalTrigger: FC<Props> = ({ token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setCurrToken } = useContext(ApplicationContext);

  return (
    <>
      <Button
        size="sm"
        onClick={() => {
          onOpen();
          setCurrToken(token);
        }}>
        Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve or decline actions: </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewTokenForm></ReviewTokenForm>
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
