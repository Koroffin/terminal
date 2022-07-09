import { DirectoryStruct, PrivateDirectoryStruct } from './directory';
import { FileStruct } from './file';

describe('DirectoryStruct', () => {
  it('DirectoryStruct.addFile should work', () => {
    const file = new FileStruct('123.png');
    const dir = new DirectoryStruct('1');
    dir.addFile(file);
    expect(dir.hasFile('123.png')).toBe(true);
  });
  it('DirectoryStruct.addDir should work', () => {
    const subDir = new DirectoryStruct('123');
    const dir = new DirectoryStruct('1');
    dir.addDir(subDir);
    expect(dir.hasDir('123')).toBe(true);
  });
  it('DirectoryStruct.forEachDir should work', () => {
    const dir = new DirectoryStruct('1');
    for (let i = 0; i < 5; i++) {
      dir.addDir(new DirectoryStruct(`${i}Dir`));
    }
    const fn = jest.fn();
    dir.forEachDir(fn);
    expect(fn).toBeCalledTimes(5);
  });
  it('DirectoryStruct.forEachFile should work', () => {
    const dir = new DirectoryStruct('1');
    for (let i = 0; i < 5; i++) {
      dir.addFile(new FileStruct(`${i}File`));
    }
    const fn = jest.fn();
    dir.forEachFile(fn);
    expect(fn).toBeCalledTimes(5);
  });
  it('PrivateDirectoryStruct.isVisible = false by default', () => {
    const dir = new PrivateDirectoryStruct();
    expect(dir.isVisible).toBe(false);
  });
  it('PrivateDirectoryStruct.name is empty by default', () => {
    const dir = new PrivateDirectoryStruct();
    expect(dir.name).toBe('');
  });
  it('DirectoryStruct.isVisible = true by default', () => {
    const dir = new DirectoryStruct('1');
    expect(dir.isVisible).toBe(true);
  });
  it('DirectoryStruct.hasDir should work', () => {
    const dir = new DirectoryStruct('1');
    dir.addDir(new DirectoryStruct('2'));
    expect(dir.hasDir('2')).toBe(true);
  });
  it('DirectoryStruct.getDir should work', () => {
    const dir = new DirectoryStruct('1');
    dir.addDir(new DirectoryStruct('2'));
    expect(dir.getDir('2')).toBeInstanceOf(DirectoryStruct);
    expect(dir.getDir('2').name).toBe('2');
  });
  it('DirectoryStruct.hasFile should work', () => {
    const dir = new DirectoryStruct('1');
    dir.addFile(new FileStruct('2'));
    expect(dir.hasFile('2')).toBe(true);
  });
  it('DirectoryStruct.getDir nested should work', () => {
    const dir = new DirectoryStruct('1');
    const subdir = new DirectoryStruct('2');
    dir.addDir(subdir);
    subdir.addDir(new DirectoryStruct('3'));
    expect(dir.getDir('2/3')).toBeInstanceOf(DirectoryStruct);
    expect(dir.getDir('2/3').name).toBe('3');
  });
});
