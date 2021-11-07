import { Elements } from "react-flow-renderer";

export const getSelectedElementIds = (elements: Elements): string[] => {
  return elements ? elements.map((element) => element.id) : [];
};

export const logTitles = (elements: Elements): void => {
  console.log("Elements: ", elements.map((e: any) => e.data.label).join(", "));
};
