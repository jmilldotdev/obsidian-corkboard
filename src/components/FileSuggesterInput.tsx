import * as React from "react";
import { FileSuggest } from "../suggesters/FileSuggester";
import { AppContext } from "./context";

export const FileSuggesterInput = (): React.ReactElement => {
  const ref = React.useRef<HTMLInputElement>();
  const app = React.useContext(AppContext);

  React.useEffect(() => {
    if (ref.current) {
      new FileSuggest(app, ref.current);
    }
  });

  return (
    <div>
      <input ref={ref} />
    </div>
  );
};
