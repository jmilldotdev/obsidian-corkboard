import { TFile } from "obsidian";
import React from "react";
import { useStoreState, useStoreActions } from "react-flow-renderer";
import styled from "styled-components";
import CorkboardPlugin from "../index";
import { SpreadType } from "./types";
import { buildClockSpread } from "./spreads/ClockSpread";
import SpreadTypeSelector from "./SpreadTypeSelector";
import { logTitles } from "../helpers/replaceSelection";

const StyledSettingsForm = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 250px;
  border-radius: 6px;
  box-shadow: 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.1),
    0px 2px 10px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

interface SettingsFormProps {
  plugin: CorkboardPlugin;
  numNodes: string;
  setNumNodes: (numNodes: string) => void;
}

const SettingsForm = ({
  plugin,
  numNodes,
  setNumNodes,
}: SettingsFormProps): JSX.Element => {
  const nodes = useStoreState((store) => store.nodes);
  const setNodes = useStoreActions((actions) => actions.setElements);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const [spreadType, setSpreadType] = React.useState<SpreadType>(
    SpreadType.Clock
  );

  const randomNotesHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotes(parseInt(numNodes));
    postFillHandler(notes);
  };

  const randomNotesFromSearchHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotesFromSearch(
      parseInt(numNodes)
    );
    postFillHandler(notes);
  };

  const postFillHandler = (notes: TFile[]): void => {
    let newElements;
    if (spreadType == SpreadType.Clock) {
      newElements = buildClockSpread(notes, parseInt(numNodes), 300);
    }
    setNodes([]);
    setSelectedElements([]);
    console.log("New elements: ", newElements);
    setNodes(newElements);
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
      <button onClick={() => logTitles(nodes)}>Show notes</button>
      <SpreadTypeSelector setSpreadType={setSpreadType} />
    </StyledSettingsForm>
  );
};

export default SettingsForm;
