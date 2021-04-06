import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { UnsavedChangesContext } from "contexts/UnsavedChangesContext";
import React, { FC, useCallback, useContext, useRef, useState } from "react";

import MarkdownEditor from "./MarkdownEditor";
import MarkdownViewer from "./MarkdownViewer";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  startTitle?: string;
  onSave?: (title: string, body: string) => Promise<void>;
}

const MarkdownTwoSplit: FC<Props> = ({
  value,
  onValueChange,
  startTitle = "myservice.md",
  onSave = null
}) => {
  const [title, setTitle] = useState(startTitle);

  const { setUnsavedChanges } = useContext(UnsavedChangesContext);

  const left = useRef<HTMLDivElement>();
  const right = useRef<HTMLDivElement>();

  const scrollDelayer = useRef<NodeJS.Timeout>();

  const syncScroll = useCallback(
    (from: typeof left, to: typeof left) => (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const coef = Math.round((from.current.scrollTop / from.current.scrollHeight) * 100) / 100;
      const scrollTo = to.current.scrollHeight * coef;

      clearTimeout(scrollDelayer.current);
      scrollDelayer.current = setTimeout(
        () =>
          to.current.scrollTo({
            top: scrollTo
          }),
        50
      );

      console.log(event);
    },
    []
  );

  return (
    <VStack>
      <HStack w="100%">
        <Input
          border="none"
          textAlign="center"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {onSave && (
          <Button
            colorScheme="green"
            onClick={() => {
              setUnsavedChanges(false);
              onSave(title, value);
            }}>
            Save Changes
          </Button>
        )}
      </HStack>
      <HStack w="190ch" align="top" maxH="100ch" borderWidth="1px">
        <Box overflowY="auto" ref={left} onScroll={syncScroll(left, right)} id="leftScroll">
          <MarkdownEditor
            value={value}
            onValueChange={s => {
              setUnsavedChanges(true);
              onValueChange(s);
            }}
          />
        </Box>
        <Box overflowY="auto" ref={right} onScroll={syncScroll(right, left)} id="rightScroll">
          <MarkdownViewer value={value} />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MarkdownTwoSplit;
