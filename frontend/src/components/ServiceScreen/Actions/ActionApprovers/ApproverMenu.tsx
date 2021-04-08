import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack
} from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useEffectAsync } from "hooks/useEffectAsync";
import React, { FC, useContext, useState } from "react";
import { IActionApproverIdDto, IActionIdDto } from "services/backend/nswagts";

import AddActionApproverTriggerBtn from "./AddActionApproverTriggerBtn";
import CopyApproverTriggerBtn from "./CopyApproversTriggerBtn";
import ViewActionApproversTriggerBtn from "./ViewActionApproversTriggerBtn";

type Props = {
  currAction: IActionIdDto;
};
const ApproverMenu: FC<Props> = ({ currAction }) => {
  const [isOpen, setOpen] = useState(false);
  const [approvers, setApprovers] = useState<IActionApproverIdDto[]>([]);
  const { fetchActionApprovers } = useContext(ServiceViewContext);

  useEffectAsync(async () => {
    const data = await fetchActionApprovers(currAction.id);
    setApprovers(data);
  }, []);

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
            <AddActionApproverTriggerBtn currAction={currAction} />
            <CopyApproverTriggerBtn currAction={currAction} />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default ApproverMenu;
