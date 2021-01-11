import React, { Component } from 'react';

class DropFiles extends Component {

  render() {
    const allFiles = [];
    
    for (let i=0;i<this.props.files.length;i++) {
      allFiles.push(
        <div className="drop-file" onClick={(fileNumber) => this.props.onClick(i)} key={i}>
          {this.props.files[i]}
        </div>
      );
    }

    return (
      <div>
        {allFiles}
      </div>
    );
  }
}

export default DropFiles;