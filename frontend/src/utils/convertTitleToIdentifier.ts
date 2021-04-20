export const convertToIdentifier = (title: string): string => {
  const identifier = title;
  //TODO Should properly als handle camelCase Titles better, and not all
  return identifier
    .toLowerCase()
    .replaceAll(/[^a-z .]/g, "")
    .replaceAll(/[. ]/g, "_")
    .replaceAll(/(_{2,})/g, "_");
};
