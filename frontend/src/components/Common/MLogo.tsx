import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";

const MLogo: FC = () => {
  return (
    <Link href="/">
      <Box cursor={"pointer"} boxSize="50px" borderWidth="1px" rounded="full" borderColor="black">
        <Image src="/images/icons/icon-144x144.png" />
      </Box>
    </Link>
  );
};
export default MLogo;
