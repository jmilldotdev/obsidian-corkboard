import React from "react";

import { Handle, Position } from "react-flow-renderer";
import styled from "styled-components";

interface IdeaClockNoteNodeProps {
  data: {
    label: string;
    path: string;
  };
}

const StyledIdeaClockNoteNode = styled.div`
  font-size: 11px;
  text-align: center;
  line-height: normal;
  height: 60px;
  width: 120px;
  background-color: #fff;
  color: black;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const IdeaClockNoteNode = ({ data }: IdeaClockNoteNodeProps): JSX.Element => {
  return (
    <div>
      <StyledIdeaClockNoteNode>
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
      </StyledIdeaClockNoteNode>
    </div>
  );
};

export default IdeaClockNoteNode;
