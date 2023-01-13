import { copyFileSync, lstatSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function copyFolderSync(from: string, to: string) {
  mkdirSync(to);
  readdirSync(from).forEach((element) => {
    if (lstatSync(join(from, element)).isFile()) {
      copyFileSync(join(from, element), join(to, element));
    } else {
      copyFolderSync(join(from, element), join(to, element));
    }
  });
}

function getDirectoriesRecursive(srcpath: string): string[] {
  return [
    srcpath,
    ...readdirSync(srcpath)
      .map((file: string) => join(srcpath, file))
      .filter((path: string) => statSync(path).isDirectory())
      .map((item) => getDirectoriesRecursive(item))
      .reduce((a: any, b: any) => a.concat(b), [])
  ];
}

export { copyFolderSync, getDirectoriesRecursive };
