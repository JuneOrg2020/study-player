import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import {HashRouter, Route, Link} from 'react-router-dom'; 
import MenuScreen from '../components/MenuScreen';
import InputFileScreen from '../components/InputFileScreen';
import SoundSelectScreen from '../components/SoundSelectScreen';
import DeleteSoundScreen from '../components/DeleteSoundScreen';
import MainPlayerScreen from '../components/MainPlayerScreen';
import ReviewPlayerScreen from '../components/ReviewPlayerScreen';

class StudyPlayerContainer extends Component {

  constructor(props) {
    super(props);
    const { studyPlayer, actions } = this.props;

    const ls = window.localStorage;
    const fmax = ls.getItem('F_MAX');
    if (fmax== null) {
      ls.setItem('F_MAX', 1);
      fmax = 1;
    }

    for (let i=1; i<fmax; i++) {
      const info = ls.getItem("F_INFO_"+i);
      if (info == null) {
        continue;
      } 
      studyPlayer.soundList.push(
        JSON.parse(info)
      );
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="menu-area">
          <Link to='/'><div className="menu-button">Menu</div></Link>
        </div>
        <div className="content-area">
          <Route exact path='/'      render={() => <MenuScreen parent={this.props}/> } />   
          <Route exact path='/input' render={() => <InputFileScreen parent={this.props}/> } />
          <Route exact path='/select' render={() => <SoundSelectScreen parent={this.props}/> } />
          <Route exact path='/delete-sound' render={() => <DeleteSoundScreen parent={this.props}/> } />
          <Route exact path='/main' render={() => <MainPlayerScreen parent={this.props}/> } />
          <Route exact path='/review' render={() => <ReviewPlayerScreen parent={this.props}/> } />
          <div className="footer-area"></div>
        </div>
      </HashRouter>
    );
  }
}

const mapState = (state, ownProps) => ({
  studyPlayer: state.studyPlayer,
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(StudyPlayerContainer);