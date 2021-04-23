import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { FaSun } from "@react-icons/all-files/fa/FaSun";
import React, { FC } from "react";

const ColorModeToggler: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      bgColor="transparent"
      onClick={toggleColorMode}
      aria-label="light / dark toggle"
      _hover={{ bg: "gray.500" }}
      icon={colorMode === "light" ? <FaMoon color="white" /> : <FaSun color="white" />}
    />
  );
};
export default ColorModeToggler;
