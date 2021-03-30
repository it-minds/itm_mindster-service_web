import { Box, Button, Flex, Image, Select, Spacer, Wrap } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import { ViewContext } from "contexts/ViewContext";
import Link from "next/link";
import { FC, useContext } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

import CreateApplicationTriggerBtn from "./Application/CreateApplicationTriggerBtn";
import SelectAppTriggerBtn from "./Application/SelectAppTriggerBtn";

const Header: FC = () => {
  const { applications, setCurrApp } = useContext(ViewContext);

  function handleSelectChange(value: string | number) {
    setCurrApp(applications.find(e => e.id == value));
  }

  return (
    <Wrap p="5" bgColor="#673AB7" width="full">
      <Flex align="center" width="full">
        <Box>
          <Image borderRadius="full" boxSize="50px" src="/images/icons/icon-144x144.png" />
        </Box>

        <Box m="5" w="max-content">
          {/* <Select
            w="full"
            placeholder={`Select Application`}
            onChange={event => handleSelectChange(event.target.value)}>
            {applications.map((application: ApplicationIdDto) => (
              <option key={application.id} value={application.id}>
                {application.id}: {application.title}
              </option>
            ))}
          </Select> */}
          <SelectAppTriggerBtn></SelectAppTriggerBtn>
        </Box>

        <Spacer />
        <Box alignContent="end" justifyContent="right">
          <Link href="/">
            <Button
              rightIcon={<BsArrowRight />}
              borderWidth="1px"
              borderColor="black"
              bgColor="orange">
              Enter as Service Provider
            </Button>
          </Link>
        </Box>
      </Flex>
    </Wrap>
  );
};

export default Header;
