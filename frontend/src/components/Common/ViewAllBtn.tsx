import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
type Props = {
  totalItems: number;
};
const ViewAllBtn: FC<Props> = ({ totalItems }) => {
  return (
    <>
      <Box cursor="pointer">View All ({totalItems})</Box>
    </>
  );
};

export default ViewAllBtn;
