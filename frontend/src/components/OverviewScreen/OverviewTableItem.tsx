import { Td, Tr } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import Link from "next/link";
import React, { FC } from "react";
import { AppOverviewDto, ServiceOverviewDto } from "services/backend/nswagts";

type Props = {
  item: AppOverviewDto | ServiceOverviewDto;
};
const OverviewTableItem: FC<Props> = ({ item }) => {
  const { hoverBg } = useColors();
  if (item instanceof AppOverviewDto) {
    return (
      <Link href={{ pathname: "/ApplicationScreen", query: { Id: item.id } }} passHref>
        <Tr _hover={{ bgColor: hoverBg }} cursor={"pointer"}>
          <Td>{item.title}</Td>
          <Td>{item.appIdentifier}</Td>
        </Tr>
      </Link>
    );
  } else
    return (
      <Link href={{ pathname: "/ServiceScreen", query: { Id: item.id } }} passHref>
        <Tr _hover={{ bgColor: hoverBg }} cursor={"pointer"}>
          <Td>{item.title}</Td>
          <Td>{item.serviceIdentifier}</Td>
        </Tr>
      </Link>
    );
};
export default OverviewTableItem;
