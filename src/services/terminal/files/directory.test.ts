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
});
