import * as actionTypes from '../utils/actionTypes';

export const onDropSoundFile = (files) => ({
  type: actionTypes.DropSoundFile,
  files,
});

export const PushStateMainPlayer = (state) => ({
　type: actionTypes.PushStateMainPlayer,
  state,
});

export const PushStateReviewPlayer = (state) => ({
　type: actionTypes.PushStateReviewPlayer,
  state,
});