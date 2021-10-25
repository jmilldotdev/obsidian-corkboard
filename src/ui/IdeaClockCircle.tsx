import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IdeaClockNote from "./IdeaClockNote";

const StyledCircle = styled.div`
  background: orange;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 40px auto 40px;
  position: relative;
`;

const StyledCircleHold = styled.div`
  position: absolute;
  left: 90px;
  top: 90px;
`;

const IdeaClockCircle = (): JSX.Element => {
  const [square, setSquare] = useState([]);

  const buildCircle = () => {
    const num = 7; //Number of Square to be generate
    const type = 1;
    const radius = "100"; //distance from center
    const start = -90; //shift start from 0
    const slice = (360 * type) / num;

    const items = [];
    let i;
    for (i = 0; i < num; i++) {
      const rotate = slice * i + start;
      const rotateReverse = rotate * -1;

      items.push({
        radius: radius,
        rotate: rotate,
        rotateReverse: rotateReverse,
      });
    }
    setSquare(items);
  };

  useEffect(() => {
    buildCircle();
  }, []);

  return (
    <div>
      <StyledCircle>
        <StyledCircleHold>
          {square.map(function (value, index) {
            return <IdeaClockNote css={value} num={index + 1} />;
          })}
        </StyledCircleHold>
      </StyledCircle>
    </div>
  );
};

export default IdeaClockCircle;
