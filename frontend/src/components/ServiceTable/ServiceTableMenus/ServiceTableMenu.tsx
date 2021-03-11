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

import AddServiceTriggerBtn from "./AddServiceTriggerBtn";

const ServiceTableMenu: FC = () => {
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
              <AddServiceTriggerBtn></AddServiceTriggerBtn>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ServiceTableMenu;
