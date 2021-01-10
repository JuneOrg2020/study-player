import * as actionTypes from '../utils/actionTypes';

const initialAppState = {
  // main
  playTitle: "",
  playList: [],
  mainPlayer: {
    playNumber: 0,
    currentPlayFileName: "",
    volume: 0.2,
    speed: 1.0,
    startPointString: "",
    nextPlayFlagString: "Loop【Next】",
    saveFileString: "",
  },
  // select
  selectSoundNumber: 0,
  soundList: [],
  // input
  title: "",
  dropFiles: [],
};

const studyPlayer = (state = initialAppState, action) => {

  if (action.type === actionTypes.DropSoundFile) {    

    const dropFiles = state.dropFiles.slice();
    
    for (let f in action.files) {
      if (action.files[f].name == undefined) {
        break;
      }
      const result = dropFiles.find(item => item == action.files[f].name);

      if (result == undefined) {
        dropFiles.push(action.files[f].name);
      }
    }

    return {
      ...state,
      dropFiles: dropFiles,
    };
  } else if (action.type === actionTypes.PushStateMainPlayer) {

    return {
      ...state,
      mainPlayer: action.state
    };
  } else {
    return state;
  }
};

export default studyPlayer;