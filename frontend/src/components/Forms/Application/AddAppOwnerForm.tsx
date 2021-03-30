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
import { ApplicationOwnerDto, IApplicationOwnerDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (OwnerMetaDataForm: IApplicationOwnerDto[]) => void;
  AppMetaData?: IApplicationOwnerDto[];
};

const AppOwnerForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appOwners, dispatchAppOwners] = useReducer(ListReducer<IApplicationOwnerDto>("email"), []);
  const [newOwner, setNewOwner] = useState<IApplicationOwnerDto>(
    new ApplicationOwnerDto({
      email: ""
    })
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

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
      {appOwners.length == 0 ? (
        <Box> Add owners with the Add button and click add owners when finished</Box>
      ) : (
        <Box>
          {appOwners.map(owner => (
            <Tag m="5px" colorScheme="facebook" key={owner.email}>
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
              value={newOwner.email}
              placeholder="Write the email of the user you want to add"
              onChange={event => setNewOwner({ email: event.target.value })}></Input>
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
            isDisabled={appOwners.length == 0}
            colorScheme="blue"
            width="full"
            onClick={onOpen}
            mt={6}>
            add owners
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
            <AlertDialogHeader>Confirm new owners</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to add these users to your application?
              <Box>
                {appOwners.map(owner => (
                  <Tag m="5px" colorScheme="facebook" key={owner.email}>
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
