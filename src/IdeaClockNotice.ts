import { Notice } from "obsidian";

export class IdeaClockNotice extends Notice {
  constructor(message: string, timeout?: number) {
    super("Idea Clock: " + message, timeout);
  }
}
