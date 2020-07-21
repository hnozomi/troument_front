import React from 'react';
import { Link } from "react-router-dom";


class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todolists: this.props.todolists
    }
  }

  render() {
    return (
      <div className="navigation-wrapper">
        <nav className="navigation">
          <ul className="nav-items">
            <li className="nav-item" onClick={() => { this.props.ClickCloseForm() }}><Link to="/"><img src="/icon/home.svg" className="nav-item-icon nav-item-home" alt="" /><span className="nav-item-text">ホーム</span></Link></li>
            <li className="nav-item"><Link to="/Search"><img className="nav-item-icon nav-item-search" alt="" src="/icon/search.svg" /><span className="nav-item-text">検索</span></Link></li>
            <li className="nav-item"><Link to="/Notify"><img className="nav-item-icon nav-item-bell" alt="" src="/icon/bell.svg" /><span className="nav-item-text">通知</span></Link></li>
            <li className="nav-item"><Link to="/Mypage"><img className="nav-item-icon nav-item-person" alt="" src="/icon/person.svg" /><span className="nav-item-text">マイページ</span></Link></li>
          </ul>
        </nav>

      </div>

    );
  }
}

export default Navigation;