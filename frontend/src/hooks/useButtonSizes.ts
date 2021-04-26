import { useBreakpointValue } from "@chakra-ui/react";

// ignore due to implied typing is better suited for this kind of hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useButtonSizes = () => {
  const defBtnSize = useBreakpointValue({ base: "xs", sm: "xs", md: "md", lg: "md" });

  return {
    defBtnSize
  };
};
