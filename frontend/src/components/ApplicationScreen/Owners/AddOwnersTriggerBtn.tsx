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
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationOwnerDto, CreateApplicationOwnerCommand } from "services/backend/nswagts";

import AppOwnerForm from "../../Forms/Application/AppOwnerForm";

const AddOwnersTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchAppOwners, currApplication } = useContext(AppViewContext);
  const toast = useToast();
  const { t } = useLocales();

  const addOwners = useCallback(
    async (form: ApplicationOwnerDto[]) => {
      const applicationClient = await genApplicationClient();
      try {
        await applicationClient.addAppOwners(
          currApplication.id,
          new CreateApplicationOwnerCommand({
            appOwners: form
          })
        );
        toast({
          description: t("toasts.xAdded", { x: t("entityNames.plural.owners") }),
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `${t("toasts.xAddedE", {
            x: t("entityNames.plural.owners")
          })} ${error}`,

          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        onClose();
        fetchAppOwners();
      }
    },
    [currApplication, fetchAppOwners]
  );

  return (
    <>
      <Button onClick={onOpen} rightIcon={<BsPlus />} colorScheme="green">
        {t("applicationScreen.buttons.addOwners")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("applicationScreen.modalHeaders.addOwners", { application: currApplication.title })}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <AppOwnerForm submitCallback={addOwners}></AppOwnerForm>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOwnersTriggerBtn;
