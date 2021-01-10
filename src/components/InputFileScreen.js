import React, { Component } from 'react';

import DropFiles from '../components/DropFiles';

class InputFileScreen extends Component {

  RegisterFiles() {
    const { studyPlayer, actions } = this.props.parent;
    const ls = window.localStorage;

    let fMax = parseInt(ls.getItem('F_MAX'));
    
    const data = {
      id: fMax,
      title: studyPlayer.title,
      volume: 0.5,
      speed: 1.0,
      startPoint: 0,
      fileNumber: 0,
    }

    ls.setItem('F_INFO_'+fMax, JSON.stringify(data));
    ls.setItem('F_FILES_'+fMax, JSON.stringify(studyPlayer.files));
    ls.setItem('F_MAX', ++fMax);
  }

  DragOverAction(e) {
    e.preventDefault();
  }

  DropAction(e) {
    const { studyPlayer, actions } = this.props.parent;
    e.preventDefault();
    const files = e.dataTransfer.files;
    actions.onDropSoundFile(files);
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;

    return (
        <div>
            <h1>Sound File Input</h1>
            <button className="register-button" onClick={() => this.RegisterFiles()} >Register Files</button>
            Title:<input type="text" className="files-title" onChange={(e) => {studyPlayer.title = e.target.value}} />
            <div className="upload_area">
            <div className="drop_area"
                onDragOver={(e) => this.DragOverAction(e)}
                onDrop={(e) => this.DropAction(e)}>
                Please drag and drop file here
            </div>
            </div>
            If you'd like to delete a file below, please click the target file.
            <div className="file-input-list">
            <DropFiles 
                files={studyPlayer.dropFiles}
            />
            </div>
        </div>
    );
  }
}

export default InputFileScreen;