import {
  Button,
  Center,
  Checkbox,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { ActionIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import ActionListItem from "./ActionListItem";

interface ActionTableProps {
  tableData: ActionIdDto[];
}
const ActionList: FC<ActionTableProps> = ({ tableData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const requestedActions: Array<number> = [];

  const checkAll = useCallback(() => {
    if (requestedActions.length == 0) {
      tableData.forEach(action => {
        requestedActions.push(action.id);
      });
      console.log(requestedActions);
      setAllChecked(true);
    } else if (requestedActions.length == tableData.length) {
      requestedActions.splice(0, requestedActions.length);
      console.log(requestedActions);
      setAllChecked(false);
    }
  }, [tableData]);

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
                Request acces
                <Checkbox
                  checked={allChecked}
                  onChange={() => checkAll()}
                  size="lg"
                  colorScheme="green"
                  inputProps={{ "aria-label": "Checkbox A" }}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((action: ActionIdDto) => (
              <ActionListItem key={action.id} action={action} checked={allChecked}></ActionListItem>
            ))}
          </Tbody>
        </Table>
        {isLoading ? (
          <Button variant="outline" width="full" mt={10}>
            <Spinner></Spinner>
          </Button>
        ) : (
          <Button variant="outline" width="full" mt={20} type="submit">
            Request actions
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default ActionList;
