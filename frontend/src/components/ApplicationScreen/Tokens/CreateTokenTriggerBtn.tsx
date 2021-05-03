import {
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  Tag,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import AppTokenForm from "components/Forms/Application/AppTokenForm";
import ServiceLibraryDrawer from "components/ServiceLibrary/ServiceLibraryDrawer";
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { AppTokenCreateDto, CreateAppTokenCommand } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

import CollapsibleInfoBox from "../../Common/CollapsibleInfoBox";
import ThreeStepShower from "../../Common/ThreeStepShower";

const CreateTokenTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, fetchUpdatedToken } = useContext(AppViewContext);
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const { t } = useLocales();

  const createAppToken = useCallback(
    async (metaData: AppTokenCreateDto) => {
      const client = await genApplicationClient();
      try {
        const result = await client.createAppToken(
          currApplication.id,
          new CreateAppTokenCommand({
            appToken: new AppTokenCreateDto({
              description: metaData.description,
              tokenIdentifier: convertToIdentifier(metaData.tokenIdentifier)
            })
          })
        );
        fetchUpdatedToken(result);
        toast({
          description: "AppToken was created",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        setOpen(true);
        onClose();
      } catch (error) {
        toast({
          description: `CreateAppToken responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    },
    [currApplication]
  );

  if (currApplication == null) return null;
  // The Create new token Btn is wrapped in a transparent Tag because of
  //a issue with tooltips not showing on disabled buttons
  return (
    <>
      <Tooltip
        isDisabled={currApplication.appSecretGenerated}
        hasArrow
        label="Generate AppSecret First">
        <Tag bgColor="transparent">
          <Button
            isDisabled={!currApplication.appSecretGenerated}
            onClick={onOpen}
            rightIcon={<BsPlus />}
            colorScheme="green">
            Create new token
          </Button>
        </Tag>
      </Tooltip>

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
              <Center height="full">
                <Container height="full" w="4xl" maxW="unset">
                  <Flex direction="column" width="full" height="full">
                    <CollapsibleInfoBox
                      text={t("applicationScreen.infoBoxes.createTokenInfo")}></CollapsibleInfoBox>
                    <AppTokenForm submitCallback={createAppToken}></AppTokenForm>
                    <Spacer />
                    <ThreeStepShower radius={50} stepCounter={1} />
                  </Flex>
                </Container>
              </Center>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default CreateTokenTriggerBtn;
