import { Box, FormControl, FormLabel, HStack, Input, Select } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import { AppTokenActionUpdateDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  index: number;
  localFormData: AppTokenActionUpdateDto;
  submitCallback: (index: number, action: AppTokenActionUpdateDto) => void;
};

const ReviewTokenFormItem: FC<Props> = ({ index, localFormData, submitCallback }) => {
  const handleStateChange = useCallback(
    value => {
      localFormData.state = value;
      submitCallback(index, localFormData);
    },
    [localFormData]
  );
  const handleTextChange = useCallback(
    value => {
      localFormData.rejectionReason = value;
      submitCallback(index, localFormData);
    },
    [localFormData]
  );

  return (
    <HStack spacing="5" p="2">
      <Box width="150px">
        <FormControl isRequired>
          <FormLabel> Response</FormLabel>
          <Select
            defaultValue={localFormData.state}
            placeholder={`Pending`}
            onChange={event => handleStateChange(event.target.value)}>
            <option value={ServiceStates.Approved}>Approve</option>
            <option value={ServiceStates.Rejected}>Reject</option>
          </Select>
        </FormControl>
      </Box>
      <Box w="full">
        <FormControl
          isRequired={localFormData.state == ServiceStates.Rejected}
          isReadOnly={localFormData.state != ServiceStates.Rejected}>
          <FormLabel>Rejection Reason: </FormLabel>
          <Input
            type="text"
            placeholder="Why the rejection?"
            value={localFormData.rejectionReason}
            onChange={event => handleTextChange(event.target.value)}></Input>
        </FormControl>
      </Box>
    </HStack>
  );
};
export default ReviewTokenFormItem;
