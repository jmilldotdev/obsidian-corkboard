import { TFile } from "obsidian";
import React from "react";
import { useStoreState, useStoreActions, Elements } from "react-flow-renderer";
import styled from "styled-components";
import CorkboardPlugin from "../index";
import { SpreadType } from "./types";
import { buildClockSpread } from "./spreads/ClockSpread";
import SpreadTypeSelector from "./SpreadTypeSelector";

const StyledSettingsForm = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 250px;
  border-radius: 6px;
  box-shadow: 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.1),
    0px 2px 10px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

interface SettingsFormProps {
  plugin: CorkboardPlugin;
  numNodes: string;
  setNumNodes: (numNodes: string) => void;
  setElements: (elements: Elements) => void;
}

const SettingsForm = ({
  plugin,
  numNodes,
  setNumNodes,
  setElements,
}: SettingsFormProps): JSX.Element => {
  const nodes = useStoreState((state) => state.nodes);
  const selectedElements = useStoreState((state) => state.selectedElements);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const [spreadType, setSpreadType] = React.useState<SpreadType>(
    SpreadType.Clock
  );

  const getSelectedElementIds = () => {
    return selectedElements.map((element) => element.id);
  };

  const numNodesToReplace = () => {
    if (selectedElements && selectedElements.length > 0) {
      return selectedElements.length;
    }
    return parseInt(numNodes);
  };

  const randomNotesHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotes(numNodesToReplace());
    postFillHandler(notes);
  };

  const randomNotesFromSearchHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotesFromSearch(
      numNodesToReplace()
    );
    postFillHandler(notes);
  };

  const replaceSelectionHandler = (notes: TFile[]) => {
    console.log("replaceSelectionHandler");
    const selectedElementIds = getSelectedElementIds();
    let i = 0;
    const newElements = nodes.map((node) => {
      if (selectedElementIds.includes(node.id)) {
        const newNode = {
          ...node,
          data: {
            ...node.data,
            file: notes[i],
            label: notes[i].basename,
            path: notes[i].path,
          },
        };
        i = i + 1;
        return newNode;
      }
      return node;
    });
    console.log(newElements);
    setElements(newElements);
  };

  const postFillHandler = (notes: TFile[]): void => {
    if (selectedElements && selectedElements.length > 0) {
      replaceSelectionHandler(notes);
      return;
    }
    let newElements;

    if (spreadType == SpreadType.Clock) {
      newElements = buildClockSpread(notes, parseInt(numNodes), 300);
    }

    setElements([]);
    setSelectedElements([]);
    setElements(newElements);
  };

  return (
    <StyledSettingsForm>
      <input
        value={numNodes}
        onChange={(event) => setNumNodes(event.target.value)}
      />
      <button onClick={randomNotesHandler}>Get notes</button>
      <button onClick={randomNotesFromSearchHandler}>
        Get notes from search
      </button>
      <SpreadTypeSelector setSpreadType={setSpreadType} />
    </StyledSettingsForm>
  );
};

export default SettingsForm;
