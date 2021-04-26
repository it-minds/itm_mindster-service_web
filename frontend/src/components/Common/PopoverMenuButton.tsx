import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
type Props = {
  btnText: string;
  onClickMethod: React.MouseEventHandler<HTMLButtonElement>;
};
const PopoverMenuButton: FC<Props> = ({ btnText, onClickMethod }) => {
  return (
    <Button
      justifyContent="left"
      isFullWidth={true}
      size="md"
      borderRadius={0}
      variant="ghost"
      onClick={onClickMethod}>
      {btnText}
    </Button>
  );
};
export default PopoverMenuButton;
