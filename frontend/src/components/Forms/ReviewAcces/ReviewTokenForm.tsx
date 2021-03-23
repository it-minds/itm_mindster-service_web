import { Box, Button, Center, Heading, Spinner, useToast, VStack } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import {
  AppTokenActionIdDto,
  AppTokenActionUpdateDto,
  AppTokenUpdateDto,
  UpdateAppTokenCommand
} from "services/backend/nswagts";

import ReviewTokenFormItem from "./ReviewTokenFormItem";

const ReviewTokenForm: FC = () => {
  const { currToken, services, fetchAppTokens } = useContext(ApplicationContext);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [actions, setActions] = useState<AppTokenActionUpdateDto[]>(
    currToken.appTokenActions.map(
      action =>
        new AppTokenActionUpdateDto({
          state: action.state,
          rejectionReason: action.rejectionReason
        })
    )
  );

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      const client = await genApplicationClient();
      try {
        await client.updateAppTokenActions(
          currToken.id,
          new UpdateAppTokenCommand({
            appToken: new AppTokenUpdateDto({
              appTokenActions: actions
            })
          })
        );
        toast({
          description: "Submission was received",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `UpdateAppToken responded: ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
      fetchAppTokens();
      setIsLoading(false);
    },
    [actions, currToken]
  );

  const updateAction = useCallback(
    (index: number, action: AppTokenActionUpdateDto) => {
      setActions(
        actions.map(x => {
          if (actions.indexOf(x) == index) x == action;
          return x;
        })
      );
    },
    [currToken, actions]
  );

  return (
    <Center>
      <VStack width="full">
        <Box w="full" borderRadius="md" borderWidth="2px">
          <form onSubmit={() => handleSubmit(event)}>
            {currToken.appTokenActions.map((action: AppTokenActionIdDto) => (
              <Box key={action.id} m="4" p="2" borderWidth="1px" borderRadius="sm">
                <Heading size="h4">{`ActionId: ${action.actionId} `}</Heading>
                <ReviewTokenFormItem
                  submitCallback={updateAction}
                  index={currToken.appTokenActions.indexOf(action)}
                  localFormData={
                    actions[currToken.appTokenActions.indexOf(action)]
                  }></ReviewTokenFormItem>
              </Box>
            ))}
            {isLoading ? (
              <Button variant="outline" width="full" mt={6}>
                <Spinner></Spinner>
              </Button>
            ) : (
              <Button variant="outline" width="full" mt={6} type="submit">
                Submit
              </Button>
            )}
          </form>
        </Box>

        {/* {actions.map(action => (
          <Box key={actions.indexOf(action)} m="4" p="2" borderWidth="1px" borderRadius="sm">
            {action.state}
            <Box>RR:{action.rejectionReason}</Box>
          </Box>
        ))} */}
      </VStack>
    </Center>
  );
};

export default ReviewTokenForm;
