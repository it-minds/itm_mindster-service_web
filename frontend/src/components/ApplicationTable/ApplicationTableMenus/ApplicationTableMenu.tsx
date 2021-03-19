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

import AddApplicationTriggerBtn from "./AddApplicationTriggerBtn";
import AddAppTokenTriggerBtn from "./ApplicationItemMenus/AddAppTokenTriggerBtn";

const ApplicationTableMenu: FC = () => {
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
            <VStack minWidth="full" spacing="0">
              <AddApplicationTriggerBtn></AddApplicationTriggerBtn>
              <AddApplicationTriggerBtn></AddApplicationTriggerBtn>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ApplicationTableMenu;
