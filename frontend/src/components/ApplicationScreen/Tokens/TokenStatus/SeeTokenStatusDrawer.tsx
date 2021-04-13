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
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext } from "react";

import TokenStatusList from "./TokenStatusList";

const SeeTokenStatusDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currToken } = useContext(AppViewContext);

  if (currToken == null) return null;
  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<BsPlus />}
        borderWidth="1px"
        borderColor="black"
        View
        status>
        See Status
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <Flex>
                <Box>
                  Status of {currToken.id} {currToken.description}
                </Box>
                <Spacer />
                <CloseButton onClick={onClose} />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Box padding="100" width="full">
                <VStack pl="50" width="full" align="left">
                  <Heading> STATUS:</Heading>
                  {/* <TokenStatusList /> */}
                  <ThreeStepShower radius={50} stepCounter={3} />
                </VStack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default SeeTokenStatusDrawer;
