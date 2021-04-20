import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsCircle } from "@react-icons/all-files/bs/BsCircle";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { FC } from "react";
import { IAppTokenActionIdDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  tokenAction: IAppTokenActionIdDto;
};
const TokenStatusListItem: FC<Props> = ({ tokenAction }) => {
  return (
    <Flex m="1" align="center">
      <Box>Action: {tokenAction.actionId}</Box>
      <Box ml="20px">
        {tokenAction.state == ServiceStates.Approved && <BsCheck color="green" size="30px" />}
        {tokenAction.state == ServiceStates.Pending && <BsCircle color="grey" size="30px" />}
        {tokenAction.state == ServiceStates.Rejected && (
          <Popover>
            <PopoverTrigger>
              <Box cursor="pointer">
                <BsX size="30px" color="red" />
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Rejection Reason</PopoverHeader>
              <PopoverBody>{tokenAction.rejectionReason}</PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Box>
    </Flex>
  );
};

export default TokenStatusListItem;
