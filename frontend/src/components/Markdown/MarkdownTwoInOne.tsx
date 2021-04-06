import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { UnsavedChangesContext } from "contexts/UnsavedChangesContext";
import React, { FC, useContext, useState } from "react";

import MarkdownEditor from "./MarkdownEditor";
import MarkdownViewer from "./MarkdownViewer";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  startTitle?: string;
  onSave?: (title: string, body: string) => Promise<void>;
}

const MarkdownTwoInOne: FC<Props> = ({
  value,
  onValueChange,
  startTitle = "myservice.md",
  onSave = null
}) => {
  const [title, setTitle] = useState(startTitle);

  const { setUnsavedChanges } = useContext(UnsavedChangesContext);

  return (
    <Tabs variant="enclosed" size="lg">
      <TabList>
        <Tab>
          <EditIcon />
        </Tab>
        <Tab>
          <ViewIcon />
        </Tab>
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
      </TabList>
      <TabPanels>
        <TabPanel p="0">
          <MarkdownEditor
            value={value}
            onValueChange={s => {
              setUnsavedChanges(true);
              onValueChange(s);
            }}
          />
        </TabPanel>
        <TabPanel p="0">
          <MarkdownViewer value={value} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MarkdownTwoInOne;
