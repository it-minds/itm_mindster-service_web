export const convertToIdentifier = (title: string): string => {
  const identifier = title;
  //TODO Should properly also handle camelCase Titles better, and not all
  return identifier
    .toLowerCase()
    .replaceAll(/[^a-z ._]/g, "")
    .replaceAll(/[. ]/g, "_")
    .replaceAll(/(_{2,})/g, "_");
};
