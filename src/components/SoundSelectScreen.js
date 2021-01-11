import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SoundSelectScreen extends Component {
  
  constructor(prop) {
    super(prop);
    
  }

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
            <div className="sound-select-item" onClick={(id) => this.SelectSound(studyPlayer.soundList[i].id)} key={i}>
                {studyPlayer.soundList[i].title}
            </div>
        );
    }

    return (
      <div>
        <h1>Sound Select</h1>
        <Link to='/delete-sound'><div className="button-2">Delete Sound</div></Link>
        {SoundListView}
      </div>
    );
  }
}

export default SoundSelectScreen;