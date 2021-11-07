import { Setting } from "obsidian";
import * as React from "react";
import CorkboardPlugin from "../index";
import { FileSuggest } from "../suggesters/FileSuggester";

interface FileSuggesterInputProps {
  plugin: CorkboardPlugin;
}

export const FileSuggesterInput = ({
  plugin,
}: FileSuggesterInputProps): React.ReactElement => {
  const ref = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (ref.current) {
      new Setting(ref.current).addSearch((cb) => {
        new FileSuggest(plugin.app, cb.inputEl, plugin);
        cb.setPlaceholder("Example: folder1/folder2");
      });
    }
  });

  return <div ref={ref} />;
};
