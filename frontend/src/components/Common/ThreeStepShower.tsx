import { Center, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
type Props = {
  radius: number;
  stepCounter: number;
};
const ThreeStepShower: FC<Props> = ({ radius, stepCounter }) => {
  return (
    <HStack margin="10">
      <Flex
        borderWidth="1px"
        borderColor="black"
        bgColor={stepCounter == 1 ? "blue.100" : "white"}
        minHeight={radius}
        minWidth={radius}
        borderRadius="full">
        <Center w="full">
          <Text>1</Text>
        </Center>
      </Flex>

      <Divider height="1px" width="full" color="blue" bgColor="black" />
      <Flex
        borderWidth="1px"
        borderColor="black"
        bgColor={stepCounter == 2 ? "blue.100" : "white"}
        minHeight={radius}
        minWidth={radius}
        borderRadius="full">
        <Center w="full">
          <Text>2</Text>
        </Center>
      </Flex>
      <Divider height="1px" width="full" color="blue" bgColor="black" />
      <Flex
        borderWidth="1px"
        borderColor="black"
        bgColor={stepCounter == 3 ? "blue.100" : "white"}
        minHeight={radius}
        minWidth={radius}
        borderRadius="full">
        <Center w="full">
          <Text>3</Text>
        </Center>
      </Flex>
    </HStack>
  );
};
export default ThreeStepShower;
