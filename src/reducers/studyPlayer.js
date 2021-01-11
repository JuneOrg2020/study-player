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
  // review
  reviewPlayer: {
    files: [],
    deleteFileString: "",
  },
  // select
  selectSoundNumber: 0,
  soundList: [],
  // input
  inputFile: {
    title: "",
    dropFiles: [],
  },
};

const studyPlayer = (state = initialAppState, action) => {

  if (action.type === actionTypes.PushStateInputFile) {    

    return {
      ...state,
      state: action.state,
    };
  } else if (action.type === actionTypes.PushStateMainPlayer) {

    return {
      ...state,
      mainPlayer: action.state
    };
  } else if (action.type === actionTypes.PushStateReviewPlayer) {

    return {
      ...state,
      reviewPlayer: action.state
    };
  } else {
    return state;
  }
};

export default studyPlayer;