import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { IAppTokenActionIdDto } from "services/backend/nswagts";

type Props = {
  tokenAction: IAppTokenActionIdDto;
};
const TokenStatusListItem: FC<Props> = ({ tokenAction }) => {
  return (
    <Box>
      Service x:{" "}
      <Box>
        Action: {tokenAction.actionId} {tokenAction.state}
      </Box>
    </Box>
  );
};

export default TokenStatusListItem;
