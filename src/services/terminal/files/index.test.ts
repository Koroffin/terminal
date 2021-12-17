import { DEFAULT_DIR_COUNT, TerminalFiles } from '.';
import { DirectoryStruct } from './directory';
import { FileStruct } from './file';

describe('TerminalFiles', () => {
  afterEach(() => {
    TerminalFiles.reset();
  });
  it('TerminalFiles.generateDefaultTree should work', () => {
    TerminalFiles.generateDefaultTree();
    expect(TerminalFiles.rootDir.directories.length).toBe(DEFAULT_DIR_COUNT);
  });
  it('TerminalFiles.reset should work', () => {
    TerminalFiles.generateDefaultTree();
    TerminalFiles.reset();
    expect(TerminalFiles.rootDir.directories.length).toBe(0);
  });
  it('TerminalFiles.ls should work', () => {
    TerminalFiles.rootDir.addDir(new DirectoryStruct('1Dir'));
    TerminalFiles.rootDir.addDir(new DirectoryStruct('2Dir'));
    TerminalFiles.rootDir.addFile(new FileStruct('1.txt'));
    expect(TerminalFiles.ls()).toEqual(['.', '1Dir/', '2Dir/', '1.txt']);
  });
});
