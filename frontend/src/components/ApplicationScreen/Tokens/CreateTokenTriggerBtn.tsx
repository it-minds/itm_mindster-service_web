import {
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import AppTokenForm from "components/Forms/Application/AppTokenForm";
import ServiceLibraryDrawer from "components/ServiceLibrary/ServiceLibraryDrawer";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { AppTokenCreateDto, CreateAppTokenCommand } from "services/backend/nswagts";

import ThreeStepShower from "../../Common/ThreeStepShower";

const CreateTokenTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchAppTokens, appTokens, currApplication, setCurrToken } = useContext(AppViewContext);
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const createAppToken = useCallback(
    async (metaData: AppTokenCreateDto) => {
      const client = await genApplicationClient();
      try {
        const result = await client.createAppToken(
          currApplication.id,
          new CreateAppTokenCommand({ appToken: metaData })
        );
        toast({
          description: "AppToken was created",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        setCurrToken({ id: result, description: metaData.description, appTokenActions: [] }); // sets currTokenId so that fetchAppTokens fetches the remaining data
        await fetchAppTokens();
      } catch (error) {
        toast({
          description: `CreateAppToken responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
      onClose();
      setOpen(true);
    },
    [currApplication, fetchAppTokens, appTokens]
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
      <ServiceLibraryDrawer Open={open} setOpen={setOpen} />

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
                  <ThreeStepShower radius={50} stepCounter={1} />
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
