import React from "react";
import styled from "styled-components";
import IdeaClockNote from "./IdeaClockNote";
import { NoteInfo } from "./IdeaClockView";

interface StyledCircleProps {
  radius: number;
}

const StyledCircle = styled.div`
  background-color: #9e8aff;
  width: ${({ radius }: StyledCircleProps) => radius * 2}px;
  height: ${({ radius }: StyledCircleProps) => radius * 2}px;
  border-radius: 50%;
  margin: 40px auto 40px;
  position: relative;
`;

interface StyledCircleHoldProps {
  radius: number;
}

const StyledCircleHold = styled.div`
  position: absolute;
  left: ${({ radius }: StyledCircleHoldProps) => radius - 10}px;
  top: ${({ radius }: StyledCircleHoldProps) => radius - 10}px;
`;

interface IdeaClockCircleProps {
  noteCircleInfo: NoteInfo[];
  radius: number;
}

const IdeaClockCircle = ({
  noteCircleInfo,
  radius,
}: IdeaClockCircleProps): JSX.Element => {
  return (
    <div>
      <StyledCircle radius={radius}>
        <StyledCircleHold radius={radius}>
          {noteCircleInfo &&
            noteCircleInfo.map((value, i) => {
              return (
                <div key={i} className="IdeaClock__circleNote">
                  <IdeaClockNote noteInfo={value} />
                </div>
              );
            })}
        </StyledCircleHold>
      </StyledCircle>
    </div>
  );
};

export default IdeaClockCircle;
