import {
  Box,
  Button,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import AppTokenForm from "components/Forms/Application/AppTokenForm";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { CreateAppTokenCommand } from "services/backend/nswagts";

import ThreeStepShower from "../../Common/ThreeStepShower";

const CreateTokenTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchAppTokens, currApplication } = useContext(AppViewContext);
  const toast = useToast();

  const createAppToken = useCallback(
    async metaData => {
      const client = await genApplicationClient();
      try {
        await client.createAppToken(
          currApplication.id,
          new CreateAppTokenCommand({ appToken: metaData })
        );
        toast({
          description: "AppToken was created",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `CreateAppToken responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
      fetchAppTokens();
    },
    [currApplication, fetchAppTokens]
  );

  if (currApplication == null) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        bgColor="green">
        Create new token
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <Flex>
                <Box>Create a new token</Box>
                <Spacer />
                <CloseButton onClick={onClose} />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Box padding="100" width="full">
                <VStack pl="50" width="full" align="left">
                  <AppTokenForm submitCallback={createAppToken}></AppTokenForm>
                  <ThreeStepShower radius={50} />
                </VStack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default CreateTokenTriggerBtn;
