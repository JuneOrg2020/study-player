import React, { Component } from 'react';

class DropFiles extends Component {

  render() {
    const allFiles = [];
    
    for (let i=0;i<this.props.files.length;i++) {
      allFiles.push(
        <button className="drop-file" key={i}>
          {this.props.files[i]}
        </button>
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