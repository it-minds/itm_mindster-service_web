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
      <Table borderWidth="2px" variant="striped" colorScheme="blue" size="md">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th w={0.9}>Name</Th>
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