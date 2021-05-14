import { Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { FC, useContext } from "react";
import { ActionIdDto } from "services/backend/nswagts";

import ActionTableItem from "./ActionTableItem";

const ActionTable: FC = () => {
  const { currService } = useContext(ServiceViewContext);

  if (currService == null) return null;
  if (currService.actions.length == 0) return null;
  return (
    <VStack w="full" align="left">
      <Heading size="h3">Actions:</Heading>
      <Table borderWidth="1px" variant="striped" colorScheme="gray" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th w={0.8}>Description</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {currService.actions.map((action: ActionIdDto) => (
            <ActionTableItem key={action.id} action={action} />
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ActionTable;
