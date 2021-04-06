import { Box, HStack, Td, Tooltip, Tr } from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsFillQuestionCircleFill } from "@react-icons/all-files/bs/BsFillQuestionCircleFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useColors } from "hooks/useColors";
import React, { FC, useContext, useState } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};
const ServiceTableItem: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();
  const { currService, setCurrService } = useContext(ServiceViewContext);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Tr
      onClick={() => setCurrService(service)}
      key={service.id}
      _hover={{
        bgColor: hoverBg
      }}
      cursor={"pointer"}>
      <Td>
        <HStack>
          <BsCheck visibility={currService == service ? "" : "hidden"} />
          <Box onClick={() => setIsFavorite(!isFavorite)} cursor={"pointer"}>
            {isFavorite ? <BsStarFill color="#ded035" /> : <BsStar />}
          </Box>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Box>{service.title}</Box>
          <Box>
            <Tooltip
              label={`Description: ${service.description}`}
              placement="right"
              hasArrow={true}
              shouldWrapChildren={true}
              fontSize="md">
              <BsFillQuestionCircleFill />
            </Tooltip>
          </Box>
        </HStack>
      </Td>
      <Td>{service.id}</Td>
    </Tr>
  );
};
export default ServiceTableItem;
