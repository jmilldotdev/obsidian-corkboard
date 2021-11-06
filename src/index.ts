import { ItemView, Plugin, TFile, WorkspaceLeaf } from "obsidian";
import React from "react";
import ReactDOM from "react-dom";

import IdeaClockView from "./ui/IdeaClockView";
import { randomElements } from "./util";
import { IdeaClockNotice } from "./IdeaClockNotice";
import { SearchView, VIEW_TYPE } from "./types";

class MyReactView extends ItemView {
  private reactComponent: React.ReactElement;
  plugin: IdeaClockPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: IdeaClockPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Idea Clock";
  }

  getIcon(): string {
    return "calendar-with-checkmark";
  }

  async onOpen(): Promise<void> {
    console.log("onOpen");
    this.reactComponent = React.createElement(IdeaClockView, {
      plugin: this.plugin,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactDOM.render(this.reactComponent, (this as any).contentEl);
  }

  async onClose(): Promise<void> {
    console.log("onClose");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { contentEl } = this as any;
    contentEl.empty();
    return Promise.resolve();
  }
}

export default class IdeaClockPlugin extends Plugin {
  private view: MyReactView;

  async onload(): Promise<void> {
    this.registerView(
      VIEW_TYPE,
      (leaf: WorkspaceLeaf) => (this.view = new MyReactView(leaf, this))
    );

    this.addCommand({
      id: "obsidian-idea-clock-open",
      name: "Open Idea Clock",
      callback: () => {
        this.app.workspace.getLeaf().setViewState({ type: VIEW_TYPE });
      },
    });
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
      new IdeaClockNotice("The core search plugin is not enabled", 5000);
      return;
    }

    const searchResults = searchView.dom.getFiles();

    if (!searchResults.length) {
      new IdeaClockNotice("No search results available", 5000);
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
      new IdeaClockNotice(
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
