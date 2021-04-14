import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { FC } from "react";
import { IAppTokenActionIdDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  tokenAction: IAppTokenActionIdDto;
};
const TokenStatusListItem: FC<Props> = ({ tokenAction }) => {
  return (
    <Flex m="5" align="center">
      <Box>Action: {tokenAction.actionId}</Box>
      <Box ml="20px">
        {tokenAction.state == ServiceStates.Approved && <BsCheck color="green" size="40px" />}
        {tokenAction.state == ServiceStates.Pending && <BsX color="grey" size="40px" />}
        {tokenAction.state == ServiceStates.Rejected && (
          <Tooltip
            placement="right"
            hasArrow={true}
            shouldWrapChildren={true}
            fontSize="md"
            label={tokenAction.rejectionReason}
            aria-label="A tooltip">
            <BsX color="red" size="40px" />
          </Tooltip>
        )}
      </Box>
    </Flex>
  );
};

export default TokenStatusListItem;
