import { Box, Tag, useToast, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useEffectAsync } from "hooks/useEffectAsync";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import {
  ActionApproverDto,
  CreateActionApproverCommand,
  IActionApproverIdDto,
  IActionIdDto
} from "services/backend/nswagts";

import AddActionApproverTriggerBtn from "./AddActionApproverTriggerBtn";

type Props = {
  currAction: IActionIdDto;
};
const ActionApproverOverview: FC<Props> = ({ currAction }) => {
  const [approvers, setApprovers] = useState<IActionApproverIdDto[]>([]);
  const { fetchActionApprovers } = useContext(ServiceViewContext);
  const toast = useToast();

  useEffectAsync(async () => {
    const data = await fetchActionApprovers(currAction.id);
    setApprovers(data);
  }, []);

  const addApprovers = useCallback(async (form: ActionApproverDto[]) => {
    const client = await genServiceClient();
    try {
      await client.addActionApprovers(
        currAction.id,
        new CreateActionApproverCommand({
          actionApprovers: form
        })
      );
      toast({
        description: "Approvers were added",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `PostApprovers responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      const data = await fetchActionApprovers(currAction.id);
      setApprovers(data);
    }
  }, []);

  return (
    <VStack align="left">
      <Box>
        {approvers.map((approver: IActionApproverIdDto) => (
          <Tag m="5px" key={approver.id}>
            {approver.email}
          </Tag>
        ))}
      </Box>
      <Box>
        <AddActionApproverTriggerBtn currAction={currAction} submitCallback={addApprovers} />
      </Box>
    </VStack>
  );
};

export default ActionApproverOverview;
