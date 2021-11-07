import {
  Editor,
  EditorPosition,
  EditorSuggest,
  EditorSuggestContext,
  EditorSuggestTriggerInfo,
  TFile,
} from "obsidian";
import CorkboardPlugin from "./index";

class LinkSuggestor extends EditorSuggest<string> {
  plugin: CorkboardPlugin;
  filenames: string[];

  constructor(plugin: CorkboardPlugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.filenames = this.getFilenames();
  }

  getFilenames(): string[] {
    const files = this.plugin.app.vault.getAllLoadedFiles();
    const filenames = files
      .map((file: TFile) => file.basename)
      .filter((f) => {
        if (f) {
          return f;
        }
      });
    return filenames;
  }

  onTrigger(
    cursor: EditorPosition,
    editor: Editor,
    _: TFile
  ): EditorSuggestTriggerInfo | null {
    const sub = editor.getLine(cursor.line).substring(0, cursor.ch);
    const match = sub.match(/:\S+$/)?.first();
    if (match) {
      return {
        end: cursor,
        start: {
          ch: sub.lastIndexOf(match),
          line: cursor.line,
        },
        query: match.split(":").last(),
      };
    }
    return null;
  }

  getSuggestions(context: EditorSuggestContext): string[] {
    console.log(context.query);
    return this.filenames.filter((p) => p.startsWith(context.query));
  }

  renderSuggestion(suggestion: string, el: HTMLElement): void {
    const outer = el.createDiv({ cls: "ES-suggester-container" });
    outer
      .createDiv({ cls: "ES-shortcode" })
      .setText(suggestion.replace(/:/g, ""));
  }

  selectSuggestion(suggestion: string): void {
    if (this.context) {
      (this.context.editor as Editor).replaceRange(
        suggestion,
        this.context.start,
        this.context.end
      );
    }
  }
}

export default LinkSuggestor;
