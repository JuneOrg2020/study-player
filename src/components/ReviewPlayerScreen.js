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
        this.files.push(JSON.parse(ls.getItem('RV_'+i)));
    }

    this.playTitle = this.data.title;
    this.playNumber = this.data.fileNumber;
    this.startPoint = this.data.startPoint;
    this.nextPlayFlag = true;
    this.moveAmt = 3;
    this.speedAmt = 100;

    this.state.mainPlayer.volume = this.data.volume;
    this.state.mainPlayer.speed = this.data.speed;

    if (this.files.length == 0) {
        this.state.mainPlayer.currentPlayFileName = "";
        return ;
    }

    this.state.mainPlayer.currentPlayFileName = this.files[this.playNumber].title + "/" + this.files[this.playNumber].fileName;
    console.log("review constructer");
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
    this.actions.PushStateMainPlayer(this.state.mainPlayer);
  }

  StoreLocalStorage() {
    
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;
    const SoundFileView = [];

    for (let i=0;i<this.files.length;i++) {
      SoundFileView.push(
        <button className="sound-list-item" onClick={(playNumber) => this.PlaySoundByNumber(i)} key={i}>
          {this.files[i].title+"/"+this.files[i].fileName}
        </button>
      );
    }

    return (
      <div>
        <div>Review Mode CurrentPlay:{studyPlayer.mainPlayer.currentPlayFileName}</div>
        <audio
          ref={this.audio}
          src=""
          onPlay={() => this.PlaySound()}
          onEnded={() => this.AudioEndWork()}
          onLoadedData={() => this.LoadedPlay()}
          controls="controls"
        ></audio>
        <button onClick={(code) => this.ChangeVolume(-1)}>-</button>
        <button>Vol {studyPlayer.mainPlayer.volume}</button>
        <button onClick={(code) => this.ChangeVolume(1)}>+</button>
        
        <button onClick={(code) => this.ChangeSpeed(-1)}>SpeedDown</button>
        <button>{studyPlayer.mainPlayer.speed}</button> 
        <button onClick={(code) => this.ChangeSpeed(1)}>SpeedUp</button>
        <button onClick={(Amt) => this.SpeedChangeTo(125)}>1.25</button>
        <button onClick={(Amt) => this.SpeedChangeTo(150)}>1.5</button>

        <button onClick={() => this.ChangeNextFlag()}>{studyPlayer.mainPlayer.nextPlayFlagString}</button>
        {SoundFileView}
      </div>
    );

  }

}

export default ReviewPlayerScreen;