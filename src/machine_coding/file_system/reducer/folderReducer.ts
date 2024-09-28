import { FolderState, FolderReducer } from "../types";

export const folderReducer: FolderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FILE": {
      return {
        ...state,
        addFile: !state.addFile,
      };
    }
    case "ADD_FOLDER": {
      return {
        ...state,
        addFolder: !state.addFolder,
      };
    }
    case "NEW_FILE": {
      let files = [...state.files];
      return {
        ...state,
        addFile: !state.addFile,
        files: [...files, { id: null, name: action.name }],
      };
    }
    case "NEW_FOLDER": {
      let folders = [...state.folders];
      return {
        ...state,
        addFolder: !state.addFolder,
        folders: [
          ...folders,
          {
            id: null,
            name: action.name,
            type: "",
            files: [],
            folders: [],
          },
        ],
      };
    }

    default: {
      return state;
    }
  }
};
