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
  Heading,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect } from "react";

import TokenStatusList from "./TokenStatusList";
type Props = {
  submitCallback: () => Promise<void>;
};
const SeeTokenStatusDrawer: FC<Props> = ({ submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currToken, fetchUpdatedToken } = useContext(AppViewContext);

  // useEffect(() => {
  //   fetchUpdatedToken(1085);
  // }, []);

  if (currToken == null) return null;
  return (
    <>
      <Button
        onClick={() => {
          //
          onOpen();
        }}
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        View
        status>
        See Status
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
                <Box>
                  Status of {currToken.id} {currToken.description}
                </Box>
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
                <Flex direction="column" pl="50" height="full" width="full" align="left">
                  <Heading as="h3"> Status :</Heading>
                  <TokenStatusList />
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
