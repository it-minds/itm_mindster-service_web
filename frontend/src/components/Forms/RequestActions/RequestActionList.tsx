import {
  Box,
  Button,
  Checkbox,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
  VStack
} from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import {
  ActionIdDto,
  AppTokenActionDto,
  CreateAppTokenActionsCommand,
  IAppTokenActionDto
} from "services/backend/nswagts";

import RequestActionListItem from "./RequestActionListItem";

interface ActionTableProps {
  tableData: ActionIdDto[];
  submitCallBack?: () => void;
}

const RequestActionList: FC<ActionTableProps> = ({ tableData, submitCallBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState(() =>
    tableData.map(action => ({
      id: action.id,
      checked: false
    }))
  );
  const { currToken, fetchUpdatedToken } = useContext(AppViewContext);
  const toast = useToast();

  const checkAll = useCallback(() => {
    setCheckboxes(
      checkboxes.map(x => {
        x.checked = !allChecked;
        return x;
      })
    );
    setAllChecked(!allChecked);
  }, [allChecked, checkboxes]);

  const addAction = useCallback(
    (data: number) => {
      setCheckboxes(
        checkboxes.map(x => {
          if (x.id == data) x.checked = !x.checked;
          return x;
        })
      );
      setAllChecked(checkboxes.every(e => e.checked == true));
    },
    [checkboxes, allChecked]
  );

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    const actions: IAppTokenActionDto[] = [];
    checkboxes.forEach(modal => {
      if (modal.checked) {
        actions.push(new AppTokenActionDto({ actionId: modal.id }));
      }
    });
    const client = await genApplicationClient();
    try {
      await client.createAppTokenActions(
        currToken.id,
        new CreateAppTokenActionsCommand({
          appToken: {
            appTokenActions: actions
          }
        })
      );
      toast({
        description: "Access was requested",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      fetchUpdatedToken(currToken.id);
      submitCallBack();
    } catch (error) {
      toast({
        description: `PutAppToken responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    setIsLoading(false);
  }, [checkboxes, currToken]);

  return (
    <Box>
      {tableData.length != 0 ? (
        <VStack width="full">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={allChecked}
                    onChange={() => checkAll()}
                    size="lg"
                    colorScheme="green"
                  />
                </Th>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th w={0.7}>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((action: ActionIdDto) => (
                <RequestActionListItem
                  key={action.id}
                  action={action}
                  checked={checkboxes.find(e => e.id == action.id).checked}
                  addAction={addAction}></RequestActionListItem>
              ))}
            </Tbody>
          </Table>
          <Box w="full">
            <Button
              isLoading={isLoading}
              onClick={() => onSubmit()}
              colorScheme="blue"
              mt={6}
              type="submit">
              Request actions
            </Button>
          </Box>
        </VStack>
      ) : (
        <Box w="full" justifyContent="center">
          No Actions in this Service yet
        </Box>
      )}
    </Box>
  );
};

export default RequestActionList;
