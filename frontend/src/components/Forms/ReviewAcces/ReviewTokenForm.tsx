import { Box, Button, Center, Heading, useToast, VStack } from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import {
  AppTokenActionIdDto,
  AppTokenActionUpdateDto,
  AppTokenIdDto,
  AppTokenUpdateDto,
  UpdateAppTokenActionsCommand
} from "services/backend/nswagts";

import ReviewTokenFormItem from "./ReviewTokenFormItem";
type Props = {
  token: AppTokenIdDto;
};
const ReviewTokenForm: FC<Props> = ({ token }) => {
  const { fetchPendingTokens } = useContext(ServiceViewContext);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [actions, setActions] = useState<AppTokenActionUpdateDto[]>(() =>
    token.appTokenActions.map(
      action =>
        new AppTokenActionUpdateDto({
          state: action.state,
          rejectionReason: action.rejectionReason,
          id: action.id
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
          token.id,
          new UpdateAppTokenActionsCommand({
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
      fetchPendingTokens();
      setIsLoading(false);
    },
    [actions, token]
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
    [token, actions]
  );

  return (
    <Center>
      <VStack width="full">
        <Box w="full" borderRadius="md" borderWidth="2px">
          <form onSubmit={() => handleSubmit(event)}>
            {token.appTokenActions.map((action: AppTokenActionIdDto) => (
              <Box key={action.id} m="4" p="2" borderWidth="1px" borderRadius="sm">
                <Heading size="h4">{`ActionId: ${action.actionId} TokenActionId: ${action.id} `}</Heading>
                <ReviewTokenFormItem
                  submitCallback={updateAction}
                  index={token.appTokenActions.indexOf(action)}
                  localFormData={
                    actions[token.appTokenActions.indexOf(action)]
                  }></ReviewTokenFormItem>
              </Box>
            ))}
            <Box ml="10" mb="5">
              <Button isLoading={isLoading} colorScheme="blue" mt={6} type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </VStack>
    </Center>
  );
};

export default ReviewTokenForm;
