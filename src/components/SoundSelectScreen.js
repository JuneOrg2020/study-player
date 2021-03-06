import React, { Component } from 'react';
import { Button } from '@material-ui/core';

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
            <Button variant="contained" component="span" color="primary"
                    style={{margin: "4px"}}
                    onClick={(id) => this.SelectSound(studyPlayer.soundList[i].id)} key={i}>
              {studyPlayer.soundList[i].title}
            </Button>
        );
    }

    return (
      <div>
        <h1>Sound Select</h1>
        {SoundListView}
      </div>
    );
  }
}

export default SoundSelectScreen;