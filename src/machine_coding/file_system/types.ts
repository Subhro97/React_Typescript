export interface File {
  id: number | null;
  name: string;
}

export interface Folder {
  id: number | null;
  name: string;
  type: string;
  files: File[];
  folders: Folder[];
}

export interface FolderState {
  folders: Array<Folder>;
  files: Array<File>;
  addFile: boolean;
  addFolder: boolean;
}

export type FolderReducer = (state: FolderState, action: any) => FolderState;
