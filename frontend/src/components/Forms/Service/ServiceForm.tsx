import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Wrap
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";

const ServiceForm: FC = () => {
  const { t } = useLocales();

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>Add new Service</Heading>
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
            <FormControl isRequired>
              <FormLabel>Title:</FormLabel>
              <Input type="text"></Input>
              <FormHelperText>Write the title for the new service</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Description:</FormLabel>
              <Textarea placeholder="Here is a sample placeholder" />
            </FormControl>
            <Button variant="outline" width="full" mt={4} type="submit">
              Submit
            </Button>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default ServiceForm;
