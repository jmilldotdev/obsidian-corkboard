import React from "react";
import styled from "styled-components";
import { NoteInfo } from "./IdeaClockView";

const StyledNote = styled.div`
  position: absolute;
  background: #d669bc;
  -webkit-transition: all 2s linear;
  -moz-transition: all 2s linear;
  transition: transform 2s linear;
  width: 20px;
  height: 20px;
  color: white;
  left: 0;
`;

interface IdeaClockNoteProps {
  noteInfo: NoteInfo;
}

const IdeaClockNote = ({ noteInfo }: IdeaClockNoteProps): JSX.Element => {
  return (
    <StyledNote
      style={{
        transform:
          "rotate(" +
          noteInfo.rotate +
          "deg) translate(" +
          noteInfo.radius +
          "px) rotate(" +
          noteInfo.rotateReverse +
          "deg)",
      }}
    >
      {noteInfo.title}
    </StyledNote>
  );
};

export default IdeaClockNote;
