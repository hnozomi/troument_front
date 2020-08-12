import React from 'react';
import User from './User';
import { withRouter, Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './App.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.returnHome = this.returnHome.bind(this)

  }

  logoutUser = async () => {
    try {
      await User.logout();
      this.props.history.push({ pathname: '/Toppage' });
    } catch (e) {
      this.setState({ errMessage: 'ログアウト失敗しました' });
    }
  };

  returnHome() {
    this.props.history.push({
      pathname: '/'
  })
  }

  render() {
    return (
      <header>
        <div className="header-wrapper">
          <img onClick={this.returnHome} alt="Headeraaa" className="header-image" src="/image/troument-logo.svg" />
          {User.isLoggedIn()
            ?
            <button className="logout-button" onClick={this.logoutUser}>ログアウト
              <ExitToAppIcon className="logout-button-icon" />
            </button>
            : (<ul className="nav-wrapper">
              <li className="header-nav"><Link to="/Register">会員登録</Link></li>
              <li className="header-nav"><Link to="/Login">ログイン</Link></li>
            </ul>)
          }
        </div>
      </header>
    );
  }
}

export default withRouter(Header);







