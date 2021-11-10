import { ItemView } from "obsidian";
import { hoverPreview } from "obsidian-community-lib";
import React, { useContext } from "react";
import { Handle, Position } from "react-flow-renderer";
import styled from "styled-components";
import { AppContext, EditModeContext } from "./context";
import { FileSuggesterInput } from "./FileSuggesterInput";

interface StyledCorkboardNoteNode {
  selected: boolean;
}

const StyledCorkboardNoteNode = styled.div`
  font-size: 11px;
  text-align: center;
  line-height: normal;
  height: 60px;
  width: 120px;
  background-color: ${({ selected }: StyledCorkboardNoteNode) =>
    selected ? "#9e8aff" : "#fff"};
  color: black;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

interface CorkboardNoteNodeProps {
  data: {
    label: string;
    path: string;
  };
  selected: boolean;
}

const CorkboardNoteNode = ({
  data,
  selected,
}: CorkboardNoteNodeProps): JSX.Element => {
  const { editMode } = useContext(EditModeContext);
  const app = useContext(AppContext);

  const onMouseOver = (e: any): void => {
    const activeView = app.workspace.activeLeaf.view as ItemView;
    hoverPreview(e, activeView, data.label);
  };

  return (
    <StyledCorkboardNoteNode selected={selected} onMouseOver={onMouseOver}>
      <Handle
        type="source"
        position={Position.Top}
        id="a"
        isConnectable={true}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={true}
      />
      {editMode && <FileSuggesterInput />}
    </StyledCorkboardNoteNode>
  );
};

export default CorkboardNoteNode;
