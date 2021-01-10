import * as actionTypes from '../utils/actionTypes';

export const onDropSoundFile = (files) => ({
  type: actionTypes.DropSoundFile,
  files,
});

export const onClickRegisterSoundFile = (files) => ({
　type: actionTypes.RegisterSoundFile,
　files,
});

export const PushStateMainPlayer = (state) => ({
　type: actionTypes.PushStateMainPlayer,
  state,
});
    
