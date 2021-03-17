import { Box, Center, Flex, useDisclosure, Wrap } from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";
import { ApplicationDto, ServiceIdDto } from "services/backend/nswagts";

import ActionList from "./ActionList";

type Props = {
  service: ServiceIdDto;
};

const RequestActions: FC<Props> = ({ service }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localFormData, setLocalFormData] = useState<ApplicationDto>(
    new ApplicationDto({
      title: "",
      description: ""
    })
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6}>
            <ActionList tableData={service.actions}></ActionList>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default RequestActions;
