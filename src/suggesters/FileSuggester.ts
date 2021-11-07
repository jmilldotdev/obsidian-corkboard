// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes

import { App, TAbstractFile, TFile } from "obsidian";
import { TextInputSuggest } from "./suggest";
import { get_tfiles_from_folder } from "../util";
import CorkboardPlugin from "../index";

export class FileSuggest extends TextInputSuggest<TFile> {
  constructor(
    public app: App,
    public inputEl: HTMLInputElement,
    private plugin: CorkboardPlugin
  ) {
    super(app, inputEl);
  }

  get_folder(): string {
    return this.plugin.app.vault.getRoot().path;
  }

  getSuggestions(input_str: string): TFile[] {
    const all_files = get_tfiles_from_folder(this.app, this.get_folder());
    if (!all_files) {
      return [];
    }

    const files: TFile[] = [];
    const lower_input_str = input_str.toLowerCase();

    all_files.forEach((file: TAbstractFile) => {
      if (
        file instanceof TFile &&
        file.extension === "md" &&
        file.path.toLowerCase().contains(lower_input_str)
      ) {
        files.push(file);
      }
    });

    return files;
  }

  renderSuggestion(file: TFile, el: HTMLElement): void {
    el.setText(file.path);
  }

  selectSuggestion(file: TFile): void {
    this.inputEl.value = file.path;
    this.inputEl.trigger("input");
    this.close();
  }
}
