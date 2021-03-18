import {
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
import React, { FC, useCallback, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import {
  ActionIdDto,
  AppTokenActionDto,
  CreateAppTokenActionsCommand,
  CreateAppTokenCommand
} from "services/backend/nswagts";

import ActionListItem from "./ActionListItem";

interface ActionTableProps {
  tableData: ActionIdDto[];
}

class Model {
  id;
  checked;
  constructor(id: number, checked: boolean) {
    this.id = id;
    this.checked = checked;
  }
}
const ActionList: FC<ActionTableProps> = ({ tableData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<Model[]>(
    tableData.map((action: ActionIdDto) => new Model(action.id, false))
  );
  const toast = useToast();

  // Constant at the moment, pass through props or page route later
  const applicationId = 16;

  const checkAll = useCallback(() => {
    if (allChecked) {
      checkboxes.forEach(modal => {
        modal.checked = false;
      });
    } else {
      checkboxes.forEach(modal => {
        modal.checked = true;
      });
    }
    setCheckboxes(checkboxes);
    setAllChecked(!allChecked);
  }, [allChecked, checkboxes]);

  const addAction = useCallback(
    (data: number) => {
      const copy = [...checkboxes];

      let allCheck = true;
      copy.forEach(modal => {
        if (modal.id == data) {
          modal.checked = !modal.checked;
        }
        if (modal.checked == false) {
          allCheck = false;
        }
      });
      setCheckboxes(copy);
      setAllChecked(allCheck);
    },
    [checkboxes, allChecked]
  );

  /**
   * This both creates the empty AppToken and then adds the requested AppTokenActions
   */
  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    const actions: AppTokenActionDto[] = [];
    checkboxes.forEach(modal => {
      if (modal.checked) {
        actions.push(new AppTokenActionDto({ actionId: modal.id }));
      }
    });

    const client = await genApplicationClient();
    try {
      const appTokenId = await client.createAppToken(applicationId, new CreateAppTokenCommand({}));

      await client.createAppTokenActions(
        appTokenId,
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
  }, [checkboxes]);

  return (
    <Center>
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
              <ActionListItem
                key={action.id}
                action={action}
                checked={checkboxes.find(e => e.id == action.id).checked}
                addAction={addAction}></ActionListItem>
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
    </Center>
  );
};

export default ActionList;
