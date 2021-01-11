import * as actionTypes from '../utils/actionTypes';

export const PushStateInputFile = (state) => ({
  type: actionTypes.PushStateInputFile,
  state,
});

export const PushStateSoundList = (list) => ({
    type: actionTypes.PushStateSoundList,
    list,
});

export const PushStateMainPlayer = (state) => ({
　type: actionTypes.PushStateMainPlayer,
  state,
});

export const PushStateReviewPlayer = (state) => ({
　type: actionTypes.PushStateReviewPlayer,
  state,
});