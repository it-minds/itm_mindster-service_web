import { Box } from "@chakra-ui/layout";
import marked from "marked";
import React, { FC, useMemo } from "react";

import styles from "./github.module.css";

interface Props {
  value: string;
}

const MarkdownViewer: FC<Props> = ({ value }) => {
  const rawMarkup = useMemo(() => {
    const options: marked.MarkedOptions = {
      pedantic: false,
      gfm: true,
      breaks: true,
      sanitize: true,
      smartLists: true,
      smartypants: true,
      xhtml: true
    };
    const parsed = marked(value, options);

    return parsed.replaceAll("\\n", "<br/>");
  }, [value]);
  return <Box className={styles.marked} dangerouslySetInnerHTML={{ __html: rawMarkup }} />;

  // return <ReactMarkdown renderers={ChakraUIRenderer()} source={value} escapeHtml={false} />;
};

export default MarkdownViewer;
