import {
  Box,
  Button,
  Center,
  Checkbox,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
  VStack
} from "@chakra-ui/react";
import { ApplicationContext } from "contexts/ApplicationContext";
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
}

const RequestActionList: FC<ActionTableProps> = ({ tableData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState(() =>
    tableData.map(action => ({
      id: action.id,
      checked: false
    }))
  );
  const { currToken, fetchAppTokens } = useContext(ApplicationContext);
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
    } catch (error) {
      toast({
        description: `PutAppToken responded: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    setIsLoading(false);
    fetchAppTokens();
  }, [checkboxes]);

  return (
    <Center>
      {tableData.length != 0 ? (
        <VStack width="full">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Admin Note</Th>
                <Th>
                  <Checkbox
                    isChecked={allChecked}
                    onChange={() => checkAll()}
                    size="lg"
                    colorScheme="green"
                  />
                </Th>
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
          {isLoading ? (
            <Button variant="outline" width="full" mt={10}>
              <Spinner></Spinner>
            </Button>
          ) : (
            <Button onClick={() => onSubmit()} variant="outline" width="full" mt={20} type="submit">
              {`Request actions`}
            </Button>
          )}
        </VStack>
      ) : (
        <Box w="full" justifyContent="center">
          No Actions in this Service yet
        </Box>
      )}
    </Center>
  );
};

export default RequestActionList;
