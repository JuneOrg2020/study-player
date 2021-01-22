import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class DeleteSoundScreen extends Component {
  
  DeleteSound(number) {
    const { studyPlayer, actions } = this.props.parent;

     if (!window.confirm("Do you delete '"+studyPlayer.soundList[number].title+"' ?")) {
         return;
     }

    const ls = window.localStorage;
    const id = studyPlayer.soundList[number].id
    ls.removeItem("F_INFO_"+id);
    ls.removeItem("F_FILES_"+id);

    studyPlayer.soundList.splice(number, 1);
    actions.PushStateSoundList(studyPlayer.soundList);
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;

    const SoundListView = [];

    for (let i=0;i<studyPlayer.soundList.length;i++) {
        SoundListView.push(
          <Button variant="contained" component="span" color="primary"
                  style={{margin: "4px"}}
                  onClick={(number) => this.DeleteSound(i)} key={i}>
            {studyPlayer.soundList[i].title}
          </Button>
        );
    }

    return (
      <div>
        <h1>Delete Sound</h1>
        {SoundListView}
      </div>
    );
  }
}

export default DeleteSoundScreen;