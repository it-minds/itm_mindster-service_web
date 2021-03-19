import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack
} from "@chakra-ui/react";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import React, { FC, useState } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import AddAppTokenTriggerBtn from "./AddAppTokenTriggerBtn";
import UpdateApplicationTriggerBtn from "./UpdateApplicationTriggerBtn";

type Props = {
  application: ApplicationIdDto;
};

const ApplicationItemMenu: FC<Props> = ({ application }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <IconButton
            onClick={() => setOpen(!isOpen)}
            aria-label="Service Menu"
            size="sm"
            icon={<BsThreeDots />}></IconButton>
        </PopoverTrigger>
        <PopoverContent minWidth="200" padding="0" boxSize="min-content" margin="0">
          <PopoverBody mb="2" mt="2" padding="0">
            <VStack minWidth="200" spacing="0">
              <UpdateApplicationTriggerBtn application={application}></UpdateApplicationTriggerBtn>
              <AddAppTokenTriggerBtn application={application}></AddAppTokenTriggerBtn>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ApplicationItemMenu;
