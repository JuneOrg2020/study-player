import React, { Component } from 'react';

class SoundSelectScreen extends Component {
  
  SelectSound(id) {
    const { studyPlayer, actions } = this.props.parent;
    studyPlayer.selectSoundNumber = id;
    location.href = "#/main"
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;

    const SoundListView = [];

    for (let i=0;i<studyPlayer.soundList.length;i++) {
        SoundListView.push(
            <button className="sound-list-item" onClick={(id) => this.SelectSound(studyPlayer.soundList[i].id)} key={i}>
            {studyPlayer.soundList[i].title}
            </button>
        );
    }

    return (
      <div>
        
        {SoundListView}
      </div>
    );
  }
}

export default SoundSelectScreen;