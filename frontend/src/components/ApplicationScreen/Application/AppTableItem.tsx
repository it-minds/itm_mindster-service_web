import { Box, HStack, Td, Tooltip, Tr } from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsFillQuestionCircleFill } from "@react-icons/all-files/bs/BsFillQuestionCircleFill";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { AppViewContext } from "contexts/AppViewContext";
import { useColors } from "hooks/useColors";
import React, { FC, useContext, useState } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

type Props = {
  application: ApplicationIdDto;
};
const AppTableItem: FC<Props> = ({ application }) => {
  const { hoverBg } = useColors();
  const { currApplication, setCurrApp } = useContext(AppViewContext);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Tr
      onClick={() => setCurrApp(application)}
      key={application.id}
      _hover={{
        bgColor: hoverBg
      }}
      cursor={"pointer"}>
      <Td>
        <HStack>
          <BsCheck visibility={currApplication == application ? "" : "hidden"} />
          <Box onClick={() => setIsFavorite(!isFavorite)} cursor={"pointer"}>
            {isFavorite ? <BsStarFill color="yellow" /> : <BsStar />}
          </Box>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Box>{application.title}</Box>
          <Box>
            <Tooltip
              label={`Description: ${application.description}`}
              placement="right"
              hasArrow={true}
              shouldWrapChildren={true}
              fontSize="md">
              <BsFillQuestionCircleFill />
            </Tooltip>
          </Box>
        </HStack>
      </Td>
      <Td>{application.id}</Td>
    </Tr>
  );
};
export default AppTableItem;
