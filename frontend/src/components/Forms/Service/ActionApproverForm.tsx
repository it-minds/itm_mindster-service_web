import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Tag,
  useDisclosure
} from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useReducer, useRef, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { IActionApproverIdDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (OwnerMetaDataForm: IActionApproverIdDto[]) => Promise<void>;
  AppMetaData?: IActionApproverIdDto[];
};

const ActionApproverForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [approvers, dispatchApprovers] = useReducer(ListReducer<IActionApproverIdDto>("email"), []);
  const [newApprover, setNewApprover] = useState<IActionApproverIdDto>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (AppMetaData) {
      dispatchApprovers({
        type: ListReducerActionType.AddOrUpdate,
        data: AppMetaData
      });
    }
  }, [AppMetaData]);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      dispatchApprovers({
        type: ListReducerActionType.AddOrUpdate,
        data: newApprover
      });
      setNewApprover({ email: "" });
    },
    [approvers, newApprover]
  );
  const addApprovers = useCallback(async () => {
    setIsLoading(true);
    onClose();
    await submitCallback(approvers);
    setIsLoading(false);
  }, [approvers]);

  return (
    <Box width="full" p={6}>
      {approvers.length == 0 ? (
        <Box> Add approvers with the Add button and click add Approvers when finished</Box>
      ) : (
        <Box>
          {approvers.map(owner => (
            <Tag m="5px" key={owner.email}>
              {owner.email}
            </Tag>
          ))}
        </Box>
      )}

      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Email:</FormLabel>
          <InputGroup>
            <Input
              type="email"
              value={newApprover?.email ?? ""}
              placeholder="Write the email of the user you want to add"
              onChange={event => setNewApprover({ email: event.target.value })}></Input>
            <InputRightElement>
              <Button minWidth="50" colorScheme="blue" type="submit">
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {isLoading ? (
          <Button variant="outline" width="full" mt={6}>
            <Spinner></Spinner>
          </Button>
        ) : (
          <Button
            isDisabled={approvers.length == 0}
            colorScheme="blue"
            width="full"
            onClick={onOpen}
            mt={6}>
            Add Approvers
          </Button>
        )}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Confirm new Approvers</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to add these approvers to your action?
              <Box>
                {approvers.map(owner => (
                  <Tag m="5px" key={owner.email}>
                    {owner.email}
                  </Tag>
                ))}
              </Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button onClick={() => addApprovers()} type="submit" colorScheme="red" ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Box>
  );
};
export default ActionApproverForm;
