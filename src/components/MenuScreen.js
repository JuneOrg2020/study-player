import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

class MenuScreen extends Component {

  render() {
    const { studyPlayer, actions } = this.props.parent;

    return (
        <div>
            <h1>Menu Select</h1>
            <Link to='/input'><div className="menu-item">Input Sound File</div></Link>
            <Link to='/select'><div className="menu-item">Sound Select</div></Link>
            <Link to='/delete-sound'><div className="menu-item">Delete Sound</div></Link>
            <Link to='/review'><div className="menu-item">Review Saved Part</div></Link>
        </div>
    );
  }
}

export default MenuScreen;