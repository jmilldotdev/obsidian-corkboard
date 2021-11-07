import "react-devtools";
import {
  App,
  ItemView,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  WorkspaceLeaf,
} from "obsidian";
import React from "react";
import ReactDOM from "react-dom";

import Corkboard from "./components/Corkboard";
import { randomElements } from "./util";
import { CorkboardNotice } from "./CorkboardNotice";
import { SearchView, VIEW_TYPE } from "./types";
import LinkSuggestor from "./LinkSuggestor";
import { FileSuggest } from "./suggesters/FileSuggester";

class CorkboardView extends ItemView {
  private reactComponent: React.ReactElement;
  plugin: CorkboardPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: CorkboardPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Corkboard";
  }

  getIcon(): string {
    return "calendar-with-checkmark";
  }

  async onOpen(): Promise<void> {
    console.log("onOpen");
    this.reactComponent = React.createElement(Corkboard, {
      plugin: this.plugin,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactDOM.render(this.reactComponent, (this as any).contentEl);
  }
}

export default class CorkboardPlugin extends Plugin {
  private view: CorkboardView;

  async onload(): Promise<void> {
    this.registerView(
      VIEW_TYPE,
      (leaf: WorkspaceLeaf) => (this.view = new CorkboardView(leaf, this))
    );

    this.registerEditorSuggest(new LinkSuggestor(this));

    this.addCommand({
      id: "obsidian-corkboard-open",
      name: "Open Corkboard",
      callback: () => {
        this.app.workspace.getLeaf().setViewState({ type: VIEW_TYPE });
      },
    });

    this.addSettingTab(new CorkboardSettingTab(this.app, this));
  }

  handlegetRandomNotes = async (quantity: number): Promise<TFile[]> => {
    const markdownFiles = this.app.vault.getMarkdownFiles();

    const notes = await this.getRandomNotes(markdownFiles, quantity);
    return notes;
  };

  handlegetRandomNotesFromSearch = async (
    quantity: number
  ): Promise<TFile[]> => {
    const searchView = this.app.workspace.getLeavesOfType("search")[0]
      ?.view as SearchView;

    if (!searchView) {
      new CorkboardNotice("The core search plugin is not enabled", 5000);
      return;
    }

    const searchResults = searchView.dom.getFiles();

    if (!searchResults.length) {
      new CorkboardNotice("No search results available", 5000);
      return;
    }

    const notes = await this.getRandomNotes(searchResults, quantity);
    return notes;
  };

  getRandomNotes = async (
    files: TFile[],
    quantity: number
  ): Promise<TFile[]> => {
    const markdownFiles = files.filter((file) => file.extension === "md");

    if (!markdownFiles.length) {
      new CorkboardNotice(
        "Can't open note. No markdown files available to open.",
        5000
      );
      return;
    }

    const notes = randomElements(markdownFiles, quantity);
    console.log(notes);
    return notes;
  };
}

class CorkboardSettingTab extends PluginSettingTab {
  plugin: CorkboardPlugin;

  constructor(app: App, plugin: CorkboardPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

    new Setting(this.containerEl)
      .setName("Template folder location")
      .setDesc("Files in this folder will be available as templates.")
      .addSearch((cb) => {
        new FileSuggest(this.app, cb.inputEl, this.plugin);
        cb.setPlaceholder("Example: folder1/folder2");
      });
  }
}
