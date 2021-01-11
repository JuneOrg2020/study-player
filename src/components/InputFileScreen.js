import React, { Component } from 'react';

import DropFiles from '../components/DropFiles';

class InputFileScreen extends Component {

  RegisterFiles() {
    const { studyPlayer, actions } = this.props.parent;

    if (studyPlayer.inputFile.title.length == 0) {
        alert("Please input the directory name that includes sound files.");
        return;
    }

    if (studyPlayer.inputFile.dropFiles.length == 0) {
        alert("Please drag and drop files at least 1.");
        return;
    }

    for (let l in studyPlayer.soundList) {
        if (studyPlayer.soundList[l].title == studyPlayer.inputFile.title) {
            alert("Same directory name already exist.");
            return;
        }
    }

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
    ls.setItem('F_FILES_'+fMax, JSON.stringify(studyPlayer.inputFile.dropFiles));
    ls.setItem('F_MAX', ++fMax);

    alert("Sound file data are registerd.");
    location.href = "";
  }

  DragOverAction(e) {
    e.preventDefault();
  }

  SortAry(a, b) {
    const sa = String(a).replace(/(\d+)/g, m => m.padStart(30, '0'));
    const sb = String(b).replace(/(\d+)/g, m => m.padStart(30, '0'));
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  }

  DropAction(e) {
    const { studyPlayer, actions } = this.props.parent;
    e.preventDefault();
    const files = e.dataTransfer.files;
    
    for (let f in files) {
      if (files[f].name == undefined) {
        break;
      }
      let result = studyPlayer.inputFile.dropFiles.find(item => item == files[f].name);

      if (result == undefined) {
        studyPlayer.inputFile.dropFiles.push(files[f].name);
      }
    }

    studyPlayer.inputFile.dropFiles.sort(this.SortAry);
    actions.PushStateInputFile(studyPlayer.inputFile);
  }

  DeleteDropFile(fileNumber) {
    const { studyPlayer, actions } = this.props.parent;
    studyPlayer.inputFile.dropFiles.splice(fileNumber, 1);
    actions.PushStateInputFile(studyPlayer.inputFile);
  }

  render() {
    const { studyPlayer, actions } = this.props.parent;

    return (
        <div>
            <h1>Input Sound File</h1>
            <button className="register-button button-1" onClick={() => this.RegisterFiles()} >Register Files</button>
            <div>
                Directory Name:<input type="text" className="files-title" onChange={(e) => {studyPlayer.inputFile.title = e.target.value}} />
            </div>
            <div className="upload_area">
            <div className="drop_area"
                onDragOver={(e) => this.DragOverAction(e)}
                onDrop={(e) => this.DropAction(e)}>
                Please drag and drop file here
            </div>
            </div>
            <h1>Droped Files</h1>
            If you delete a file below, please click the target file.
            <div className="file-input-list">
            <DropFiles 
                files={studyPlayer.inputFile.dropFiles}
                onClick={(fileNumber) => this.DeleteDropFile(fileNumber)}
            />
            </div>
        </div>
    );
  }
}

export default InputFileScreen;