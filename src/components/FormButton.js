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
    const { handleWorryUpdate, handleWorryAdd, handleResolveUpdate, handleResolveAdd } = this.props.actionMethod || ''
    this.setState(
      {
        isOpen: !this.state.isOpen,
      }
    );

    this.props.isUpdateFormOpen
      ? (this.state.detail_todolist.status
        ? await handleResolveUpdate(savedData)
        : await handleWorryUpdate(title, tags, savedData)
      )

      : (this.props.isOpenDetail
        ? await handleResolveAdd(savedData)
        : await handleWorryAdd(title, tags, savedData)
      )

  };

  // ****************************************************************///
  // 投稿ボタンが押されたとき
  // ****************************************************************///

  submit = async (event) => {
    event.preventDefault();

    this.props.startSending()
    await this.togglePopover()
    setTimeout(this.props.endSending, 1000)
    this.props.handleOpen()
    setTimeout(this.props.handleClose, 1500)
  }

  // ****************************************************************///
  // render
  // ****************************************************************///

  render() {
    let createButton;
    const { clickFormClose } = this.props.actionMethod || ''

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
          <button onClick={clickFormClose} className="first-button button">キャンセル</button>
          <button disabled={!this.props.canSubmit()} onClick={this.submit} type="submit" className="button">投稿</button>
        </div>
      );
    }

    return (
      <React.Fragment>
        {createButton}
      </React.Fragment>
    );
  }
}

export default FormButton;