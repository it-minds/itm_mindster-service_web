import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
  VStack
} from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useEffectAsync } from "hooks/useEffectAsync";
import React, { FC, useCallback, useContext, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import {
  ActionApproverDto,
  CreateActionApproverCommand,
  IActionApproverDto,
  IActionApproverIdDto,
  IActionIdDto
} from "services/backend/nswagts";

import AddActionApproverTriggerBtn from "./AddActionApproverTriggerBtn";
import CopyApproverTriggerBtn from "./CopyApprovers/CopyApproversTriggerBtn";
import ViewActionApproversTriggerBtn from "./ViewActionApproversTriggerBtn";

type Props = {
  currAction: IActionIdDto;
};
const ApproverMenu: FC<Props> = ({ currAction }) => {
  const [isOpen, setOpen] = useState(false);
  const [approvers, setApprovers] = useState<IActionApproverIdDto[]>([]);
  const { fetchActionApprovers } = useContext(ServiceViewContext);
  const toast = useToast();

  useEffectAsync(async () => {
    const data = await fetchActionApprovers(currAction.id);
    setApprovers(data);
  }, []);

  const addApprovers = useCallback(
    async (actionId: number, form: IActionApproverDto[]) => {
      const client = await genServiceClient();
      try {
        await client.addActionApprovers(
          actionId,
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
    },
    [approvers]
  );

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button w="full" onClick={() => setOpen(!isOpen)}>
          Actions
        </Button>
      </PopoverTrigger>
      <PopoverContent minWidth="200" padding="0" boxSize="min-content" margin="0">
        <PopoverArrow />
        <PopoverBody padding="0">
          <VStack minWidth="full" spacing="0">
            <ViewActionApproversTriggerBtn currAction={currAction} approvers={approvers} />
            <AddActionApproverTriggerBtn currAction={currAction} submitCallback={addApprovers} />
            <CopyApproverTriggerBtn
              ownersToCopy={approvers.map(e => new ActionApproverDto({ email: e.email }))}
              currAction={currAction}
              submitCallback={addApprovers}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default ApproverMenu;
