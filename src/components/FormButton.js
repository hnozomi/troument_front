import React from 'react';
import Popover from "react-popover";
import './App.css'

class FormButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      detail_todolist: this.props.detail_todolist || ''
    }
    this.togglePopover = this.togglePopover.bind(this)
  }

  // ****************************************************************///
  // 詳細を取得
  // ****************************************************************///

  async togglePopover() {
    let title = this.props.title
    let tags = this.props.tags
    let savedData = this.props.savedData
    const { worryUpdate, addLists, resolveUpdate, resolveAdd } = this.props.actionMethod || ''
    this.setState(
      {
        isOpen: !this.state.isOpen,
      }
    );

    this.props.isUpdateFormOpen
      ? (this.state.detail_todolist.status
        ? await resolveUpdate(savedData)
        : await worryUpdate(title, tags, savedData)
      )

      : (this.props.isOpenDetail
        ? await resolveAdd(savedData)
        : await addLists(title, tags, savedData)
      )

  };

  // ****************************************************************///
  // 投稿ボタンが押されたとき
  // ****************************************************************///

  submit = async(event) => {
    event.preventDefault();

    this.props.startSending()
    await this.togglePopover()
    setTimeout(this.props.endSending, 1000)
  }

  // ****************************************************************///
  // render
  // ****************************************************************///

  render() {
    let createButton;
    const { ClickCloseForm } = this.props.actionMethod || ''

    if (this.props.isOpenDetail && !this.props.isFormOpen) {
      if (this.props.login_user === this.props.detail_todolist.username) {
        createButton = (
          <div className="button-wrapper">
            <button onClick={this.props.actionMethod.resolveFormOpen} className="button">解決投稿</button>
          </div>
        );
      }
    } else {
      createButton = (
        <div className="button-wrapper">
          <button onClick={ClickCloseForm} className="first-button button">キャンセル</button>
          <Popover
            isOpen={this.state.isOpen}
            body={
              this.props.isResolveFormOpen
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
              this.props.isStatus
                ? <button onClick={this.submit} type="submit" className="button">投稿</button>
                // : <button onClick={this.submit} type="submit" className="button">投稿</button>
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