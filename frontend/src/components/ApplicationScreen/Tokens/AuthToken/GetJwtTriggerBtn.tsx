import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import JwtForm from "components/Forms/Application/JwtForm";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IService2, Service2 } from "services/backend/nswagts";
type Props = {
  submitOnOpen: () => Promise<void>;
};

const GetJwtTriggerBtn: FC<Props> = ({ submitOnOpen }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, currToken } = useContext(AppViewContext);
  const [jwtServices, setJwtServices] = useState<IService2[]>([]);

  useEffect(() => {
    if (currToken != null) {
      let services = currToken.appTokenActions.map(action => {
        return action.action.serviceId;
      });
      const set = new Set(services);
      services = Array.from(set);

      const input: IService2[] = [];
      services.forEach(element => {
        input.push(
          new Service2({
            aud: element.toString(),
            access: currToken.appTokenActions
              .filter(a => a.action.serviceId == element)
              .map(b => {
                return b.actionId.toString();
              })
          })
        );
      });
      console.log(input);
      setJwtServices(input);
    }
  }, [currToken]);

  if (currApplication == null) return null;
  return (
    <>
      <Button
        colorScheme="blue"
        onClick={async () => {
          await submitOnOpen();
          onOpen();
        }}>
        Generate JWT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get the jwt for your approved token</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {currToken != null && (
              <JwtForm
                aid={currApplication.appIdentifier}
                tokenIdentifier={currToken.tokenIdentifier}
                submitCallback={() => {
                  onClose();
                }}
                services={jwtServices}
              />
            )}
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetJwtTriggerBtn;
