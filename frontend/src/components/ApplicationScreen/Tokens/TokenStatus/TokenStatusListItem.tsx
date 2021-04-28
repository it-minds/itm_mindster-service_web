import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text
} from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { FC } from "react";
import { IAppTokenActionIdDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  tokenAction: IAppTokenActionIdDto;
};
const TokenStatusListItem: FC<Props> = ({ tokenAction }) => {
  return (
    <Flex w="xl" m="1" align="center">
      <Text maxW="500px" overflowWrap="break-word">
        {tokenAction.action.actionIdentifier}
      </Text>
      <Spacer />
      <Box ml="20px">
        {tokenAction.state == ServiceStates.Approved && <BsCheck color="green" size="30px" />}
        {tokenAction.state == ServiceStates.Pending && <BsX color="grey" size="25px" />}
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
