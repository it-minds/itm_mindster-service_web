import {
  Box,
  Button,
  Center,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { ServiceStates } from "services/backend/nswagts";

import GetJwtTriggerBtn from "../AuthToken/GetJwtTriggerBtn";
import TokenStatusList from "./TokenStatusList";

type Props = {
  submitOnClose: () => Promise<void>;
  submitOnOpen: () => Promise<void>;
  buttonText?: string;
};
const SeeTokenStatusDrawer: FC<Props> = ({
  submitOnClose: submitCallback,
  submitOnOpen,
  buttonText
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currToken, currApplication } = useContext(AppViewContext);
  const [isAllApproved, setAllApproved] = useState(false);

  /**
   * Checks if all actions of a token are approved. If true the button to
   * get a JWT is visible
   */
  useEffect(() => {
    let approved = true;
    if (currToken) {
      currToken.appTokenActions.forEach(element => {
        console.log(element);
        if (element.state == ServiceStates.Rejected || element.state == ServiceStates.Pending) {
          approved = false;
        }
      });
      console.log(approved);
      setAllApproved(approved);
    }
  }, [currToken]);

  if (currApplication == null) return null;
  return (
    <>
      <Button
        onClick={async () => {
          await submitOnOpen();
          onOpen();
        }}
        colorScheme="blue">
        {buttonText != null ? buttonText : "See Status"}
      </Button>

      <Drawer
        onClose={() => {
          onClose();
          submitCallback();
        }}
        isOpen={isOpen}
        size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <Flex>
                {currToken != null && (
                  <Box>
                    Status of {currToken.id} {currToken.description}
                  </Box>
                )}
                <Spacer />
                <CloseButton
                  onClick={() => {
                    onClose();
                    submitCallback();
                  }}
                />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Box height="full" width="full">
                <Flex direction="column" p="50" height="full" width="full" align="left">
                  <Flex height="full" width="full">
                    <TokenStatusList />
                  </Flex>
                  <Center hidden={!isAllApproved} m="5">
                    <GetJwtTriggerBtn submitOnOpen={() => null} />
                  </Center>
                  <Spacer />
                  <ThreeStepShower radius={50} stepCounter={3} />
                </Flex>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default SeeTokenStatusDrawer;
