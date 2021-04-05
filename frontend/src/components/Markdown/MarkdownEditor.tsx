import { Box } from "@chakra-ui/layout";
import { useColors } from "hooks/useColors";
import React, { FC, useMemo } from "react";
import Editor from "react-simple-code-editor";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

const MarkdownEditor: FC<Props> = ({ value = "\n", onValueChange }) => {
  const lineCount = useMemo(() => (value.match(/\n/g) || []).length + 1, [value]);

  const numberCol = useMemo(
    () =>
      value
        .split(/\n/g)
        .map((val, i) => ({ i: i + 1, l: Math.ceil(val.length / 80) }))
        .map(({ i, l }) => `${i}${[...Array(l)].join("\\00000a")}`)
        .join("\\00000a"),
    [value]
  );

  const pad = useMemo(() => Math.max(String(lineCount).length, 2), [lineCount]);

  const { menuBg, mainBg } = useColors();

  return (
    <Box
      h="100%"
      minW="80ch"
      // overflow="hidden"
      position="relative"
      bg={mainBg}
      pb={0}
      _before={{
        fontFamily: "Inconsolata, monospace",
        paddingTop: "10px",
        content: `"${numberCol}"`,
        width: `${20 + pad * 8}px`,
        position: "absolute",
        whiteSpace: "pre",
        paddingRight: "10px",
        textAlign: "right",
        opacity: 1,
        bg: menuBg,
        pb: 3
      }}>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={x => x}
        padding={10}
        style={{
          fontFamily: "Inconsolata, monospace",
          fontSize: 16,
          marginLeft: `${20 + pad * 8}px`
        }}
      />
    </Box>
  );
};

export default MarkdownEditor;
