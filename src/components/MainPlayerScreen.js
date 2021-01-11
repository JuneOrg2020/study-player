import React, { Component } from 'react';

class MainPlayerScreen extends Component {

  constructor(prop) {
    super(prop);
    this.state = this.props.parent.studyPlayer;
    this.actions = this.props.parent.actions;

    this.audio = React.createRef();
    const ls = window.localStorage;
    this.soundId = this.state.selectSoundNumber;

    this.files = [];
    this.data = null;
    if (this.soundId == 0) {
        this.soundId = ls.getItem('F_LAST_NUMBER');
    } else {
        ls.setItem('F_LAST_NUMBER', this.soundId);
    } 

    const filesData = ls.getItem('F_INFO_'+this.soundId);
    if (filesData == null) {
        return ;
    }
    this.data = JSON.parse(filesData);
    this.files = JSON.parse(ls.getItem('F_FILES_'+this.soundId));
    
    this.playTitle = this.data.title;
    this.playNumber = this.data.fileNumber;
    this.startPoint = this.data.startPoint;
    this.nextPlayFlag = true;
    this.moveAmt = 3;
    this.speedAmt = 100;

    this.state.mainPlayer.currentPlayFileName = this.files[this.playNumber];
    this.state.mainPlayer.volume = this.data.volume;
    this.state.mainPlayer.speed = this.data.speed;
    console.log("main constructer");

  }

  makePlaySrc() {
    this.state.mainPlayer.currentPlayFileName = this.files[this.playNumber];
    return "sound_files/"+this.playTitle+"/"+this.files[this.playNumber];
  }

  LoadedPlay() {
    this.audio.current.play();
  }

  PlaySound() {
    this.audio.current.volume = this.state.mainPlayer.volume;
  }

  PlaySoundByNumber(playNumber) {
    this.playNumber = playNumber;
    this.audio.current.src = this.makePlaySrc();
    this.audio.current.volume = this.state.mainPlayer.volume;
    this.audio.current.currentTime = this.startPoint;

    this.data.fileNumber = this.playNumber;
    this.StoreLocalStorage();
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  }

  StoreLocalStorage() {
    const ls = window.localStorage;
    ls.setItem('F_INFO_'+this.data.id, JSON.stringify(this.data));
  }

  AudioEndWork() {
    if (this.nextPlayFlag) {
        this.playNumber++;
        if(this.files.length === this.playNumber){
            this.playNumber = 0;
        }
        this.PlaySoundByNumber(this.playNumber);
    } else {
        this.audio.current.currentTime = this.startPoint;
        this.audio.current.play();
    }
  }

  SetStartPoint() {
    this.startPoint = this.audio.current.currentTime;
    const mnt = Math.round(this.startPoint/60);
    const scnd = Math.round(this.startPoint - mnt*60);

    this.StoreLocalStorage();
    this.state.mainPlayer.startPointString = "Start from "+( '00' + mnt ).slice( -2 )+":"+( '00' + scnd ).slice( -2 );
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  };

  ResetStartPoint() {
    this.startPoint = 0;
    this.StoreLocalStorage();
    this.state.mainPlayer.startPointString = "Start from 00:00";
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  };

  SpaceAction() {
    this.audio.current.paused ? this.audio.current.play() : this.audio.current.pause();
  };

  MovePoint(code) {
    this.audio.current.currentTime = this.audio.current.currentTime + this.moveAmt*code;
  };

  ChangeSpeed(code){
    this.speedAmt += code*5;
    if (this.speedAmt > 500) {
        this.speedAmt = 500;
    } else if (this.speedAmt < 10) {
        this.speedAmt = 10;
    }

    const speed = this.speedAmt/100;
    this.audio.current.defaultPlaybackRate = speed;
    this.audio.current.playbackRate = speed;
    this.state.mainPlayer.speed = speed;

    this.actions.PushStateMainPlayer(this.state.mainPlayer);
    this.StoreLocalStorage();
  }

  ChangeSpeedTo(Amt) {
    this.speedAmt = Amt;
    this.audio.current.defaultPlaybackRate = this.speedAmt/100;
    this.audio.current.playbackRate = this.speedAmt/100;
    this.state.mainPlayer.speed = this.speedAmt/100;

    this.actions.PushStateMainPlayer(this.state.mainPlayer);
    this.StoreLocalStorage();
  }

  ChangeVolume(code) {
    this.state.mainPlayer.volume = parseFloat(this.state.mainPlayer.volume) + code*0.05;
    if (this.state.mainPlayer.volume > 1.0) {
        this.state.mainPlayer.volume = 1.0;
    } else if (this.state.mainPlayer.volume < 0) {
        this.state.mainPlayer.volume = 0.0;
    }
    this.state.mainPlayer.volume = this.state.mainPlayer.volume.toFixed(2);
    this.audio.current.volume = this.state.mainPlayer.volume;

    this.data.volume = this.state.mainPlayer.volume;
    this.StoreLocalStorage();
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  }

  ChangeNextFlag() {
    this.nextPlayFlag = !this.nextPlayFlag;
    this.state.mainPlayer.nextPlayFlagString = !this.nextPlayFlag ? "【Loop】Next" : "Loop【Next】";

    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  }

  SaveThisFile() {
    const ls = window.localStorage;
    let saveNo = ls.getItem('RV_MAX');
    saveNo = saveNo ? parseInt(saveNo) + 1 : 1;
    
    const saveData = {
      title : this.playTitle,
      fileName : this.files[this.playNumber],
      startTime: this.audio.current.currentTime,
      volume : this.state.mainPlayer.volume,
    }

    ls.setItem("RV_"+saveNo, JSON.stringify(saveData));
    ls.setItem('RV_MAX', saveNo);

    const mnt = Math.round(this.audio.current.currentTime/60);
    const scnd = Math.round(this.audio.current.currentTime - mnt*60)
    this.state.mainPlayer.saveFileString = "you saved from " + ( '00' + mnt ).slice( -2 )+":"+( '00' + scnd ).slice( -2 );
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;
    const SoundFileView = [];

    for (let i=0;i<this.files.length;i++) {
      SoundFileView.push(
        <div className="sound-item" onClick={(playNumber) => this.PlaySoundByNumber(i)} key={i}>
          {this.files[i]}
        </div>
      );
    }

    return (
      <div>
        <div className="header-area">
          <div>{this.playTitle} CurrentPlay:{studyPlayer.mainPlayer.currentPlayFileName}</div>
          <audio
          className="audio-area"
          ref={this.audio}
          src={"sound_files/"+this.playTitle+"/"+this.files[this.playNumber]}
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
            <button onClick={(Amt) => this.SpeedChangeTo(125)}>1.25</button>
            <button onClick={(Amt) => this.SpeedChangeTo(150)}>1.5</button>
          </div>
          <div className="button-space">
            <button onClick={() => this.ChangeNextFlag()}>{studyPlayer.mainPlayer.nextPlayFlagString}</button>
            <br/>
            <button onClick={() => this.SetStartPoint()}>SetStartPoint</button>
            <button onClick={() => this.ResetStartPoint()}>ResetStartPoint</button>
            <div className="start-point-string">{studyPlayer.mainPlayer.startPointString}</div>
          </div>
          <div className="button-space">
            <button onClick={() => this.SaveThisFile()}>Save This File</button>
            <div className="save-this-file-string">{studyPlayer.mainPlayer.saveFileString}</div>
          </div>
        </div>
        <div className="sound-list">
          {SoundFileView}
        </div>
      </div>
    );

  }
}

export default MainPlayerScreen;