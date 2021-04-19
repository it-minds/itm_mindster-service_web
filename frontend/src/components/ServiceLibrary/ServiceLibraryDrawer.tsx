import {
  Box,
  Center,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useToast
} from "@chakra-ui/react";
import SeeTokenStatusDrawer from "components/ApplicationScreen/Tokens/TokenStatus/SeeTokenStatusDrawer";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import React, { Dispatch, FC, SetStateAction, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { TokenStates, UpdateAppTokenStateCommand } from "services/backend/nswagts";

import ServiceLibrary from "./ServiceLibrary";

type Props = {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ServiceLibraryDrawer: FC<Props> = ({ Open, setOpen }) => {
  const { currToken, fetchUpdatedToken } = useContext(AppViewContext);
  const toast = useToast();

  const requestReview = useCallback(async () => {
    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.updateTokenState(
        currToken.id,
        new UpdateAppTokenStateCommand({
          newState: TokenStates.AwaitingReview
        })
      );
      toast({
        description: "Review request submitted",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `UpdateTokenState responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
      fetchUpdatedToken(currToken.id);
    }
  }, [currToken]);

  const leaveLibraryDrawer = useCallback(async () => {
    setOpen(false);
  }, []);

  if (currToken) {
    return (
      <>
        <Drawer onClose={() => setOpen(false)} isOpen={Open} size="full">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>
                <Flex>
                  <Box>ServiceLibrary</Box>
                  <Spacer />
                  <CloseButton onClick={() => setOpen(false)} />
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <Flex h="full" flexDirection="column">
                  <Box mb="5" h="full" overflowY="scroll">
                    <ServiceLibrary />
                  </Box>
                  <Spacer />
                  <Center mb="5">
                    {currToken.appTokenActions.length > 0 && (
                      <SeeTokenStatusDrawer
                        submitOnOpen={() => {
                          return requestReview();
                        }}
                        buttonText="Request review (Im done browsing services)"
                        submitOnClose={leaveLibraryDrawer}
                      />
                    )}
                  </Center>
                  <ThreeStepShower radius={50} stepCounter={2} />
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  } else return null;
};

export default ServiceLibraryDrawer;
