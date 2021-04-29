import { Box, Button, Center, Collapse, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
type Props = {
  text: string;
};
const CollapsibleInfoBox: FC<Props> = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Collapse startingHeight={80} in={show}>
        <Text fontSize="lg">{text}</Text>
      </Collapse>
      <Center>
        <Button size="sm" onClick={() => setShow(!show)} mt="1rem">
          Show {show ? "Less" : "More"}
        </Button>
      </Center>
    </Box>
  );
};

export default CollapsibleInfoBox;
