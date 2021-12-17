import { FileStruct } from './file';

export class DirectoryStruct {
  public isVisible = true;
  constructor(
    public name: string,
    public files: FileStruct[] = [],
    public directories: DirectoryStruct[] = [],
    public parent: DirectoryStruct = null
  ) {}
  public addFile(file: FileStruct) {
    this.files.push(file);
  }
  public hasFile(fileName: string): boolean {
    return !!this.files.find((f) => f.name === fileName);
  }
  public addDir(dir: DirectoryStruct) {
    dir.parent = this;
    this.directories.push(dir);
  }
  public hasDir(dirName: string): boolean {
    return !!this.directories.find((d) => d.name === dirName);
  }
  public forEachDir(fn: (dir: DirectoryStruct) => void) {
    for (let i = 0, l = this.directories.length; i < l; i++) {
      fn(this.directories[i]);
    }
  }
  public forEachFile(fn: (file: FileStruct) => void) {
    for (let i = 0, l = this.files.length; i < l; i++) {
      fn(this.files[i]);
    }
  }
}

export class PrivateDirectoryStruct extends DirectoryStruct {
  public isVisible = false;
  constructor(
    public name: string = '',
    public files: FileStruct[] = [],
    public directories: DirectoryStruct[] = [],
    public parent: DirectoryStruct = null
  ) {
    super(name, files, directories, parent);
  }
}
