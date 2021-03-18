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
import React, { FC, useCallback, useEffect, useState } from "react";
import { ActionIdDto } from "services/backend/nswagts";

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
    console.log(checkboxes);
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

      console.log(checkboxes);
    },
    [checkboxes, allChecked]
  );

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
              <Tr key={action.id}>
                <Td>{action.id}</Td>
                <Td>{action.title}</Td>
                <Td>{action.description}</Td>
                <Td>{action.adminNote}</Td>
                <Td>
                  <Checkbox
                    isChecked={checkboxes.find(e => e.id == action.id).checked}
                    onChange={() => addAction(action.id)}
                    size="md"
                    colorScheme="green"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {isLoading ? (
          <Button variant="outline" width="full" mt={10}>
            <Spinner></Spinner>
          </Button>
        ) : (
          <Button variant="outline" width="full" mt={20} type="submit">
            {`Request actions`}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default ActionList;
