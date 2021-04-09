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
import React, { FC, useCallback, useContext, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import {
  CreateActionApproverCommand,
  IActionApproverDto,
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
  const { approvers, fetchActionApprovers } = useContext(ServiceViewContext);
  const toast = useToast();

  const addApprovers = useCallback(async (actionId: number, form: IActionApproverDto[]) => {
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
      fetchActionApprovers();
    }
  }, []);

  if (approvers.length == 0) return null;
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
            <ViewActionApproversTriggerBtn
              currAction={currAction}
              approvers={approvers.filter(e => e.actionId == currAction.id)}
            />
            <AddActionApproverTriggerBtn currAction={currAction} submitCallback={addApprovers} />
            <CopyApproverTriggerBtn
              ownersToCopy={approvers.filter(e => e.actionId == currAction.id)}
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
