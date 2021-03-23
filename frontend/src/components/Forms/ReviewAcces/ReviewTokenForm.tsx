import { Box, Button, Center, Spinner, VStack } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import React, { FC, useContext, useState } from "react";
import { AppTokenActionIdDto } from "services/backend/nswagts";

import ReviewTokenFormItem from "./ReviewTokenFormItem";

const ReviewTokenForm: FC = () => {
  const { currToken } = useContext(ApplicationContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Center>
      <VStack width="full">
        <Box w="full" borderRadius="md" borderWidth="2px">
          {currToken.appTokenActions.map((action: AppTokenActionIdDto) => (
            <ReviewTokenFormItem key={action.id} action={action}></ReviewTokenFormItem>
          ))}
        </Box>
        {isLoading ? (
          <Button variant="outline" width="full" mt={6}>
            <Spinner></Spinner>
          </Button>
        ) : (
          <Button variant="outline" width="full" mt={6} type="submit">
            Submit
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default ReviewTokenForm;
