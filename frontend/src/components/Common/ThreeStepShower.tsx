import { Center, Divider, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";
type Props = {
  radius: number;
  stepCounter: number;
};
const ThreeStepShower: FC<Props> = ({ radius, stepCounter }) => {
  const activeBg = useColorModeValue("blue.200", "blue.300");
  const inActiveBg = useColorModeValue("white", "gray.600");
  const textColor = useColorModeValue("black", "white");
  return (
    <Center>
      <HStack maxW="600" w="full" margin="10px">
        <Flex
          borderWidth="1px"
          borderColor="black"
          bgColor={stepCounter == 1 ? activeBg : inActiveBg}
          color={textColor}
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
          bgColor={stepCounter == 2 ? activeBg : inActiveBg}
          color={textColor}
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
          bgColor={stepCounter == 3 ? activeBg : inActiveBg}
          color={textColor}
          minHeight={radius}
          minWidth={radius}
          borderRadius="full">
          <Center w="full">
            <Text>3</Text>
          </Center>
        </Flex>
      </HStack>
    </Center>
  );
};
export default ThreeStepShower;
