import React from "react";

import { SpreadType } from "./types";

interface SpreadTypeSelectorProps {
  setSpreadType: (spreadType: SpreadType) => void;
}

const SpreadTypeSelector = ({
  setSpreadType,
}: SpreadTypeSelectorProps): JSX.Element => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  return (
    <select name="spreadType" id="spreadType" onChange={onChange}>
      <option value={SpreadType.Clock}>Clock Spread</option>
    </select>
  );
};

export default SpreadTypeSelector;
