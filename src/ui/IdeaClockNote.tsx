import React from "react";
import styled from "styled-components";

const StyledNote = styled.div`
  position: absolute;
  background: red;
  -webkit-transition: all 2s linear;
  -moz-transition: all 2s linear;
  transition: transform 2s linear;
  width: 20px;
  height: 20px;
  color: white;
  left: 0;
`;

interface IdeaClockNoteProps {
  num: number;
  css: {
    rotate: number;
    radius: number;
    rotateReverse: number;
  };
}

const IdeaClockNote = ({ num, css }: IdeaClockNoteProps): JSX.Element => {
  return (
    <StyledNote
      style={{
        transform:
          "rotate(" +
          css.rotate +
          "deg) translate(" +
          css.radius +
          "px) rotate(" +
          css.rotateReverse +
          "deg)",
      }}
    >
      {num}
    </StyledNote>
  );
};

export default IdeaClockNote;
