import React from 'react';
import MainPlayerScreen from '../components/MainPlayerScreen';

class ReviewPlayerScreen extends MainPlayerScreen {

  constructor(prop) {
    super(prop);
    this.state = this.props.parent.studyPlayer;
    this.actions = this.props.parent.actions;

    this.audio = React.createRef();
    
    const ls = window.localStorage;
    this.state.selectSoundNumber = 0;
    
    this.data = {
        id: 0,
        title: "Review Mode",
        volume: 0.3,
        speed: 1.0,
        startPoint: 0,
        fileNumber: 0,
      }
    let rvMax = ls.getItem('RV_MAX');
    rvMax = rvMax ? parseInt(rvMax) : 0;

    this.files = [];
    for (let i=1;i<=rvMax;i++) {
      if (ls.getItem('RV_'+i) == null) {
        continue;
      }
      let fileData = JSON.parse(ls.getItem('RV_'+i));
      this.files.push(fileData);
    }

    this.playTitle = this.data.title;
    this.playNumber = this.data.fileNumber;
    this.startPoint = this.data.startPoint;
    this.nextPlayFlag = true;
    this.moveAmt = 3;
    this.speedAmt = 100;

    this.state.mainPlayer.volume = this.data.volume;
    this.state.mainPlayer.speed = this.data.speed;

    this.state.reviewPlayer.files = this.files.slice();

    if (this.files.length == 0) {
        this.state.mainPlayer.currentPlayFileName = "";
        return ;
    }

  }

  makePlaySrc() {
    this.state.mainPlayer.currentPlayFileName = this.files[this.playNumber].title+"/"+this.files[this.playNumber].fileName;
    return "sound_files/"+this.files[this.playNumber].title+"/"+this.files[this.playNumber].fileName;
  }

  PlaySound() {
    this.audio.current.volume = this.files[this.playNumber].volume;
  }

  PlaySoundByNumber(playNumber) {
    this.playNumber = playNumber;
    this.audio.current.src = this.makePlaySrc();
    this.audio.current.volume = this.files[this.playNumber].volume;
    this.audio.current.currentTime = this.files[this.playNumber].startTime;

    this.data.fileNumber = this.playNumber;
    this.state.mainPlayer.volume = this.files[this.playNumber].volume;
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  }

  StoreLocalStorage() {
    
  }

  DeleteThisFile() {
    const ls = window.localStorage;
    if (this.files.length == 0 || ls.getItem('RV_'+this.files[this.playNumber].saveNo) == null) {
      return;
    }
    
    this.state.reviewPlayer.deleteFileString = "Deleted "+this.files[this.playNumber].fileName;
    ls.removeItem('RV_'+this.files[this.playNumber].saveNo);
    this.files.splice(this.playNumber, 1);
    this.state.reviewPlayer.files.splice(this.playNumber, 1);

    !this.nextPlayFlag ? ChangeNextFlag() : null;
    this.AudioEndWork();
    this.actions.PushStateReviewPlayer(this.state.reviewPlayer);
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;
    const SoundFileView = [];
    let noDataMessage = "There are no saved files.";

    if (studyPlayer.reviewPlayer.files.length > 0) {
      noDataMessage = "";
      for (let i=0;i<studyPlayer.reviewPlayer.files.length;i++) {
        SoundFileView.push(
          <div className="review-sound-item" onClick={(playNumber) => this.PlaySoundByNumber(i)} key={i}>
            {studyPlayer.reviewPlayer.files[i].title+"/"+studyPlayer.reviewPlayer.files[i].fileName}
          </div>
        );
      }
    }

    return (
        <div>
        <div className="header-area">
          <div>{this.playTitle} CurrentPlay:{studyPlayer.mainPlayer.currentPlayFileName}</div>
          <audio
            className="audio-area"
            ref={this.audio}
            src=""
            onPlay={() => this.PlaySound()}
            onEnded={() => this.AudioEndWork()}
            onLoadedData={() => this.LoadedPlay()}
            controls="controls"
          ></audio>
          <div className="button-space">
            <button onClick={(code) => this.ChangeVolume(-1)}>-</button>
            <button>Vol {studyPlayer.mainPlayer.volume}</button>
            <button onClick={(code) => this.ChangeVolume(1)}>+</button>
            <br/>
            <button onClick={(code) => this.ChangeSpeed(-1)}>SpeedDown</button>
            <button>{studyPlayer.mainPlayer.speed}</button>
            <button onClick={(code) => this.ChangeSpeed(1)}>SpeedUp</button>
            <br/>
            <button onClick={(Amt) => this.ChangeSpeedTo(125)}>1.25</button>
            <button onClick={(Amt) => this.ChangeSpeedTo(150)}>1.5</button>
          </div>
          <div className="button-space">
            <button onClick={() => this.ChangeNextFlag()}>{studyPlayer.mainPlayer.nextPlayFlagString}</button>
            <br/>
            <br/>
            <button onClick={() => this.DeleteThisFile()}>Delete ThisFile</button>
            <div className="delete-file-string">{studyPlayer.reviewPlayer.deleteFileString}</div>
          </div>
        </div>
        <div className="sound-list">
          {noDataMessage}
          {SoundFileView}
        </div>
      </div>
    );

  }

}

export default ReviewPlayerScreen;