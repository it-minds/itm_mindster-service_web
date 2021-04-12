import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer
} from "@chakra-ui/react";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";

import ServiceLibrary from "./ServiceLibrary";

type Props = {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ServiceLibraryDrawer: FC<Props> = ({ Open, setOpen }) => {
  const { currToken } = useContext(AppViewContext);
  if (currToken) {
    return (
      <>
        <Drawer onClose={() => null} isOpen={Open} size="full">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>
                <Flex>
                  <Box>
                    ServiceLibrary {currToken.id} {currToken.description}
                  </Box>
                  <Spacer />
                  <CloseButton onClick={() => setOpen(false)} />
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <Flex h="full" flexDirection="column">
                  <Box h="full" overflowY="scroll">
                    <ServiceLibrary />
                  </Box>
                  <Spacer />
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
