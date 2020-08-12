import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from "react-router-dom";
import Avatar from 'react-avatar';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';


// ****************************************************************///
//  Todolistsの表示
// ****************************************************************///

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolists: this.props.todolists,
      userinfo: this.props.userinfo,
      isGood: false,
      isMypage: this.props.isMypage,
      isSearch: this.props.isSearch
    }
    this.callDisplayDetail = this.callDisplayDetail.bind(this)
    this.handleGoodChange = this.handleGoodChange.bind(this)
    this.goodCheck = this.goodCheck.bind(this)
  }


  // ****************************************************************///
  // Detailを表示する
  // ****************************************************************///

  callDisplayDetail(worry_id) {
    this.props.history.push({
      pathname: '/'
    })
    this.props.actionMethod.displayDetail(worry_id)
  }



  // ****************************************************************///
  // 詳細を取得
  // ****************************************************************///

  componentDidMount() {
    this.goodCheck()
  }


  // ****************************************************************///
  // グッドをしたことがあるかチェック
  // ****************************************************************///

  async goodCheck() {

    if (this.props.detail_todolist) {

      const goodcheck =
        this.props.detail_todolist.user.goodlist.findIndex((good) => {
          return good === this.props.detail_todolist._id
        })

      if (goodcheck === -1) {
        this.setState(
          {
            isGood: false,
            isGoodCheck: true
          }
        )
      } else {
        this.setState(
          {
            isGood: true,
            isGoodCheck: true
          }
        )

      }

    }
  }


  // ****************************************************************///
  // goodしているか判定
  // ****************************************************************///
  async handleGoodChange() {
    this.setState((state => {
      return {
        isGood: !this.state.isGood
      }
    }), () => this.props.actionMethod.handleGoodCount(this.props._id, !this.state.isGood)
    )
  }

  // ****************************************************************///
  // render  
  // ****************************************************************///

  render() {
    let createDetail;

    if (this.props.isOpenDetail) {
      createDetail = (
        <div className={"contents-wrappers " + (this.state.isMypage ? "mypage-diplay-wrapper" : '')}>
          <div className="contents-wrapper">
            <div className="content-icon-wrap">
              <Avatar size={"50px"} round={"10px"} className="content-icon" src={"https://troument.s3-ap-northeast-1.amazonaws.com/" + this.props.thumbnail} alt="" />
            </div>
            <div className="content-wrapper">
              <div className="content-image-time">
                {this.props.detail_todolist.status
                  ? <img className="content-image display-title-hukidasi" src="/image/resolve.svg" alt="" />
                  : <img className="content-image display-title-hukidasi" src="/image/worry.svg" alt="" />}
                <span className="content-time">{this.props.actionMethod.createTime(this.props.detail_todolist.time)}</span>
              </div>

              <div className="content-text-tag">
                <p className="content-text">{this.props.detail_todolist.title}</p>
                {this.props.detail_todolist.tag && this.props.detail_todolist.tag.map((ta, tag_key) => {
                  return <p key={tag_key} className="react-tags__display-tag">{ta.name}</p>
                })}
              </div>
              {this.props.detail_todolist.status &&
                <p className="content-count">{this.props.detail_todolist.count}人が感謝しています</p>
              }
            </div>
          </div>
          {
            !this.props.isUpdateFormOpen && 
              (
                <div className="content-button-wrapper">

                  {this.props.detail_todolist.status && (
                    this.state.isGood
                      ? <button className="content-button" onClick={this.handleGoodChange}>参考になった
                              <ThumbUpIcon className="content-button-icon" style={{ fontSize: 18 }} />
                      </button>
                      : <button className="content-button" onClick={this.handleGoodChange}>参考になった
                              <ThumbUpAltOutlinedIcon className="content-button-icon" style={{ fontSize: 18 }} />
                      </button>

                  )}

                  {this.props.login_user === this.props.detail_todolist.username &&
                    <div className="content-edit-button">
                      <button className="content-button" onClick={this.props.actionMethod.updateFormOpen}>編集
                            <EditIcon className="content-button-icon" style={{ fontSize: 18 }} />
                      </button>
                      <button className="content-button" onClick={this.props.deleteDialogOpen}>
                        <span className="content-button-text">削除</span>
                        <DeleteIcon className="content-button-icon" style={{ fontSize: 18 }} />
                      </button>
                    </div>
                  }
                </div>
              )


          }
        </div >

      )
    } else {

      createDetail = (
        <React.Fragment>
          {
            this.props.todolists.map((todolist, i) => {
              return <div key={i} className={"contents-wrappers " + (this.state.isSearch ? 'search-contents-wrappers' : this.state.isMypage ? 'mypage-contents-wrappers' : '')}>
                <div onClick={() => { this.callDisplayDetail(todolist.worry_id) }} className="contents-wrapper">

                  <div className="content-icon-wrap">
                    <Avatar size={"50px"} round={"10px"} src={"https://troument.s3-ap-northeast-1.amazonaws.com/" + todolist.user.thumbnail} alt="" />
                  </div>

                  <div className="content-wrapper">
                    <div className="content-image-time">
                      {todolist.status ? <img className="content-image display-title-hukidasi" src="/image/resolve.svg" alt="" /> : <img className="dcontent-image display-title-hukidasi" src="/image/worry.svg" alt="" />}
                      <span className="content-time">{this.props.actionMethod.createTime(todolist.time)}</span>
                    </div>


                    <div className="content-text-tag">
                      <p className="content-text">{todolist.title}</p>
                      {todolist.tag && todolist.tag.map((ta, key) => {
                        return <p key={key} className="react-tags__display-tag">{ta.name}</p>
                      })}

                    </div>

                    {todolist.status
                      ? <p className="content-count">{todolist.count}人が感謝しています</p>
                      : <p className="content-count">悩み中...　応援してください</p>
                    }
                  </div>

                </div>

              </div>
            })
          }
        </React.Fragment>
      )

    }



    return (
      <React.Fragment>
        {createDetail}

      </React.Fragment>
    );


  }

}

export default withRouter(Display);