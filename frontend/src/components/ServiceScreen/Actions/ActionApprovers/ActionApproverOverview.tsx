import { Box, Tag, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { IActionApproverIdDto } from "services/backend/nswagts";

type Props = {
  approvers: IActionApproverIdDto[];
};
const ActionApproverOverview: FC<Props> = ({ approvers }) => {
  if (approvers.length == 0) return null;

  return (
    <VStack align="left">
      <Box>
        {approvers.map((approver: IActionApproverIdDto) => (
          <Tag m="5px" key={approver.id}>
            {approver.email}
          </Tag>
        ))}
      </Box>
    </VStack>
  );
};

export default ActionApproverOverview;
