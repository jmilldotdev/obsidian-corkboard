import { Notice } from "obsidian";

export class CorkboardNotice extends Notice {
  constructor(message: string, timeout?: number) {
    super("Corkboard: " + message, timeout);
  }
}
