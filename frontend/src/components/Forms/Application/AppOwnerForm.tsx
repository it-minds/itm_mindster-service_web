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
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  useDisclosure
} from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useReducer, useRef, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { IApplicationOwnerDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (OwnerMetaDataForm: IApplicationOwnerDto[]) => Promise<void>;
  AppMetaData?: IApplicationOwnerDto[];
};

const AppOwnerForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appOwners, dispatchAppOwners] = useReducer(ListReducer<IApplicationOwnerDto>("email"), []);
  const [newOwner, setNewOwner] = useState<IApplicationOwnerDto>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (AppMetaData) {
      dispatchAppOwners({
        type: ListReducerActionType.AddOrUpdate,
        data: AppMetaData
      });
    }
  }, [AppMetaData]);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      dispatchAppOwners({
        type: ListReducerActionType.AddOrUpdate,
        data: newOwner
      });
      setNewOwner({ email: "" });
    },
    [appOwners, newOwner]
  );
  const addOwners = useCallback(async () => {
    setIsLoading(true);
    onClose();
    await submitCallback(appOwners);
    setIsLoading(false);
  }, [appOwners]);

  return (
    <Box width="full" p={6}>
      <Box> Add owners with the Add button and click add owners when finished</Box>
      <Box>
        {appOwners.map(owner => (
          <Tag m="5px" key={owner.email}>
            {owner.email}
          </Tag>
        ))}
      </Box>

      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Email:</FormLabel>
          <InputGroup>
            <Input
              type="email"
              value={newOwner?.email ?? ""}
              placeholder="Write the email of the user you want to add"
              onChange={event => setNewOwner({ email: event.target.value })}
            />
            <InputRightElement>
              <Button colorScheme="blue" type="submit">
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Center>
          <Button
            isDisabled={appOwners.length == 0}
            isLoading={isLoading}
            colorScheme="blue"
            onClick={onOpen}
            mt={6}>
            add owners
          </Button>
        </Center>

        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Confirm new owners</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to add these users to your application?
              <Box>
                {appOwners.map(owner => (
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
              <Button onClick={() => addOwners()} type="submit" colorScheme="red" ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Box>
  );
};
export default AppOwnerForm;
