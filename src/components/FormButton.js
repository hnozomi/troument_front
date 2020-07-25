import React from 'react';
import Popover from "react-popover";
import './App.css'

class FormButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.togglePopover = this.togglePopover.bind(this)

  }

  // ****************************************************************///
  // 詳細を取得
  // ****************************************************************///

  togglePopover() {
    let title = this.props.title
    let tags = this.props.tags
    let savedData = this.props.savedData
    const { addLists } = this.props.actionMethod || ''
    console.log(addLists, 'BBBB')
    this.setState(
      {
        isOpen: !this.state.isOpen,
      }
    );
    this.props.displayForm
      ? (this.props.resolveUpdate
        ? setTimeout(this.props.actionMethod.resolveUpdate, 1500, savedData)
        : setTimeout(this.props.actionMethod.resolveAdd, 1500, savedData)
      )
      : (this.props.worryUpdate)
        ? (setTimeout(this.props.actionMethod.worryUpdate, 1500, title, tags, savedData))
        : (setTimeout(addLists, 1500, title, tags, savedData))
  };

  // ****************************************************************///
  // 投稿ボタンが押されたとき
  // ****************************************************************///

  submit = (event) => {
    event.preventDefault();

    this.props.ChangeTrueLoading()
    this.togglePopover()
    setTimeout(this.props.ChangeFalseLoading, 1800)
  }

  // ****************************************************************///
  // render
  // ****************************************************************///

  render() {
    let createButton;
    const { ClickCloseForm, addLists } = this.props.actionMethod || ''
    // const { ClickCloseForm } = this.props.sendMethod || ''

    
    if (this.props.state === false) {
      if (this.props.login_user === this.props.detail_todolist.username) {
        createButton = (
          <div className="button-wrapper">
            <button onClick={this.props.ClickDisplayForm} className="button">解決投稿</button>
          </div>
        );}
      } else {
        createButton = (
          <div className="button-wrapper">
            <button onClick={ClickCloseForm} className="first-button button">キャンセル</button>
            <Popover
              isOpen={this.state.isOpen}
              body={
                this.props.displayForm
                  ? (this.props.resolveUpdate
                    ? <div className="popover"><p className="popover-text">修正が完了しました！</p><p className="popover-text">その調子！</p></div>
                    : <div className="popover"><p className="popover-text">お疲れ様です！</p><p className="popover-text">その調子！</p></div>)
                  : (this.props.worryUpdate)
                    ? (<div className="popover"><p className="popover-text">修正が完了しました</p><p className="popover-text">頑張れー！</p></div>)
                    : (<div className="popover"><p className="popover-text">頑張ってください！</p><p className="popover-text">応援しています！</p></div>)

              }
              place={'above'}
              enterExitTransitionDurationMs={800}
            >
              {
                this.props.displayForm
                  ? <button onClick={this.submit} type="submit" className="button">投稿</button>
                  : <button disabled={!this.props.canSubmit()} onClick={this.submit} type="submit" className="button">投稿</button>
              }
            </Popover>
          </div>
        );
      }

    // }

    return (
      <React.Fragment>
        {createButton}
        </React.Fragment>
    );
  }
}

export default FormButton;