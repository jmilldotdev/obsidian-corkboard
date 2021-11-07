import { App, TAbstractFile, Vault, TFile, TFolder, normalizePath } from "obsidian";

export function randomElements<T>(arr: T[], quantity: number): T[] {
  const result = new Array(quantity);
  let len = arr.length;
  const taken = new Array(len);
  if (quantity > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (quantity--) {
    const x = Math.floor(Math.random() * len);
    result[quantity] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function resolve_tfolder(app: App, folder_str: string): any {
  folder_str = normalizePath(folder_str);

  const folder = app.vault.getAbstractFileByPath(folder_str);

  if (!folder) {
    console.error(`Folder "${folder_str}" doesn't exist`);
  }
  if (!(folder instanceof TFolder)) {
    console.error(`${folder_str} is a file, not a folder`);
  }

  return folder;
}

export function get_tfiles_from_folder(
  app: App,
  folder_str: string
): Array<TFile> {
  const folder = resolve_tfolder(app, folder_str);

  const files: Array<TFile> = [];
  Vault.recurseChildren(folder, (file: TAbstractFile) => {
    if (file instanceof TFile) {
      files.push(file);
    }
  });

  files.sort((a, b) => {
    return a.basename.localeCompare(b.basename);
  });

  return files;
}
