import { generateCoolName } from 'Services/names';
import { DirectoryStruct, PrivateDirectoryStruct } from './directory';
import { FileStruct } from './file';

export const DEFAULT_DIR_COUNT = 3;
export const DEFAULT_FILE_COUNT = 5;
export const DEFAULT_SUBDIR_COUNT = 2;
export const DEFAULE_SUBFILES_COUNT = 3;

export class TerminalFiles {
  public static rootDir: PrivateDirectoryStruct = new PrivateDirectoryStruct();
  private static currentDir: DirectoryStruct = TerminalFiles.rootDir;
  public static get currentDirName(): string {
    return this.currentDir.name;
  }
  private static $makeDir(
    name: string = generateCoolName({ isDir: true }),
    files: FileStruct[] = []
  ): DirectoryStruct {
    return new DirectoryStruct(name, files);
  }
  private static $makeFile(name: string = generateCoolName()): FileStruct {
    return new FileStruct(name);
  }
  public static generateDefaultTree() {
    for (let i = 0; i < DEFAULT_DIR_COUNT; i++) {
      const dir = TerminalFiles.$makeDir();

      for (let j = 0; j < DEFAULT_SUBDIR_COUNT; j++) {
        const subDir = TerminalFiles.$makeDir();
        for (let k = 0; k < DEFAULE_SUBFILES_COUNT; k++) {
          const file = TerminalFiles.$makeFile();
          subDir.addFile(file);
        }
        dir.addDir(subDir);
      }

      for (let j = 0; j < DEFAULT_FILE_COUNT; j++) {
        const file = TerminalFiles.$makeFile();
        dir.addFile(file);
      }

      TerminalFiles.rootDir.addDir(dir);
    }
  }
  public static ls(sortBy: keyof FileStruct = 'name'): string[] {
    const res: string[] = ['.'];
    if (this.currentDir !== TerminalFiles.rootDir) {
      res.push('..');
    }
    const dir = TerminalFiles.currentDir;
    dir.forEachDir(({ name }) => res.push(`${name}/`), sortBy);
    dir.forEachFile(({ name }) => res.push(name), sortBy);
    return res;
  }
  public static cd(dir: string) {
    const dirStruct = TerminalFiles.currentDir.getDir(dir);
    if (dirStruct) {
      TerminalFiles.currentDir = dirStruct;
    }
  }
  public static reset() {
    TerminalFiles.rootDir = new PrivateDirectoryStruct();
    TerminalFiles.currentDir = TerminalFiles.rootDir;
  }
}
