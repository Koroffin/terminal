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
  it('TerminalFiles.ls in subdirectories should return ..', () => {
    TerminalFiles.rootDir.addDir(new DirectoryStruct('1Dir'));
    TerminalFiles.cd('1Dir');
    expect(TerminalFiles.ls()).toEqual(['.', '..']);
  });
  it('TerminalFiles.cd should work', () => {
    TerminalFiles.rootDir.addDir(new DirectoryStruct('1Dir'));
    TerminalFiles.cd('1Dir');
    expect(TerminalFiles.currentDirName).toEqual('1Dir');
  });
  it('TerminalFiles.cd should not work', () => {
    TerminalFiles.rootDir.addDir(new DirectoryStruct('1Dir'));
    const oldDirName = TerminalFiles.currentDirName;
    TerminalFiles.cd('2Dir');
    expect(TerminalFiles.currentDirName).toEqual(oldDirName);
  });
});
