import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import React, { FC, useState } from "react";
type Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};
const LibrarySearchBar: FC<Props> = ({ keyword, setKeyword }) => {
  useState();

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input
        w="full"
        borderRadius="full"
        value={keyword}
        placeholder={"search for service"}
        onChange={e => setKeyword(e.target.value)}
      />
    </InputGroup>
  );
};

export default LibrarySearchBar;
