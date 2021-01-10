import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

class MenuScreen extends Component {

  render() {
    const { studyPlayer, actions } = this.props.parent;

    return (
        <div>
            <h1>Menu Select</h1>
            <button className="menu-item"><Link to='/input'>Input Sound File</Link></button>
            <button className="menu-item"><Link to='/select'>Sound Select</Link></button>
            <button className="menu-item"><Link to='/review'>Review Saved Part</Link></button>
        </div>
    );
  }
}

export default MenuScreen;