import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
            <div className="delete-sound-item" onClick={(number) => this.DeleteSound(i)} key={i}>
                {studyPlayer.soundList[i].title}
            </div>
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