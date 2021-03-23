import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spacer
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AppTokenActionIdDto } from "services/backend/nswagts";

type Props = {
  action: AppTokenActionIdDto;
};

const ReviewTokenFormItem: FC<Props> = ({ action }) => {
  return (
    <Box m="4" p="2" borderWidth="1px" borderRadius="sm">
      <Heading size="h4">{`ActionId: ${action.actionId}`}</Heading>

      <form>
        <HStack spacing="5" p="2">
          <Box width="150px">
            <FormControl isRequired>
              <FormLabel> Response:</FormLabel>
              <Select>
                <option color="green">Approved</option>
                <option color="red">Rejected</option>
              </Select>
            </FormControl>
          </Box>
          <Box w="full">
            <FormControl isRequired>
              <FormLabel>Rejection Reason: </FormLabel>
              <Input
                type="text"
                placeholder="Why the rejection?"
                // onChange={event => updateLocalForm(event.target.value, "title")}
              ></Input>
            </FormControl>
          </Box>
        </HStack>
      </form>
    </Box>
  );
};
export default ReviewTokenFormItem;
