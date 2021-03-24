import { Box, Button, Flex, Image, Select, Spacer, Wrap } from "@chakra-ui/react";
import { ViewContext } from "contexts/ViewContext";
import Link from "next/link";
import { FC, useContext } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import CreateApplicationTriggerBtn from "./CreateApplicationTriggerBtn";

const Header: FC = () => {
  const { applications, setCurrApp } = useContext(ViewContext);

  function handleSelectChange(value: string | number) {
    setCurrApp(applications.find(e => e.id == value));
  }

  return (
    <Wrap p="5" bgColor="blue.400" width="full">
      <Flex align="center" width="full">
        <Box>
          <Image
            borderRadius="full"
            boxSize="100px"
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
          />
        </Box>

        <Box m="5" w="max-content">
          <Select w="full" onChange={event => handleSelectChange(event.target.value)}>
            <option>Select Application</option>
            {applications.map((application: ApplicationIdDto) => (
              <option key={application.id} value={application.id}>
                {application.id} Token: {application.description}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <CreateApplicationTriggerBtn></CreateApplicationTriggerBtn>
        </Box>
        <Spacer />
        <Box alignContent="end" justifyContent="right">
          <Link href={`/`}>
            <Button bgColor="orange">{`Enter as Service Provider ->`}</Button>
          </Link>
        </Box>
      </Flex>
    </Wrap>
  );
};

export default Header;
