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
    console.log(this.props, 'this.props.displayForm')
    console.log(this.props.actionMethod, 'this.props.actionMethod')
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

      // formがtrueの時は、
      // 状態によって処理する関数を変えたい
      // 更新画面状態かどうか、悩みの投稿か解決の投稿か
      // this.props.displayForm
      // console.log(this.props.isUpdateFormOpen, 'this.props.isUpdateFormOpen')
      // console.log(this.props.isStatus, 'this.props.isStatus')
      // console.log(this.props.isResolveFormOpen, 'this.props.isResolveFormOpen')
      this.props.isUpdateFormOpen
      ?(this.state.detail_todolist.status
        ?  await resolveUpdate(savedData)
        :  await worryUpdate(title, tags, savedData)
        // :  await worryUpdate(title, tags, savedData)
        )

      : (this.props.isOpenDetail
         ? await resolveAdd(savedData)
         : await addLists(title, tags, savedData)
         )

      
      // this.props.isResolveFormOpen
      // ?(isStatus
      //   ?  await resolveUpdate(savedData)
      //   :  await worryUpdate(title, tags, savedData)
      //   )

      // : (this.props.isUpdateFormOpen)
      //    ? await resolveAdd(savedData)
      //    : await addLists(title, tags, savedData)


        // : (setTimeout(addLists, 3500, title, tags, savedData))
        // this.props.displayForm
        //   ? (this.props.resolveUpdate
        //     ? setTimeout(this.props.actionMethod.resolveUpdate, 1500, savedData)
        //     : setTimeout(this.props.actionMethod.resolveAdd, 1500, savedData)
        //   )
        //   : (this.props.worryUpdate)
        //     ? (setTimeout(this.props.actionMethod.worryUpdate, 1500, title, tags, savedData))
        //     : (setTimeout(addLists, 1500, title, tags, savedData))
  };

  // ****************************************************************///
  // 投稿ボタンが押されたとき
  // ****************************************************************///

  submit = (event) => {
    event.preventDefault();

    this.props.startSending()
    this.togglePopover()
    setTimeout(this.props.endSending, 1000)
  }

  // ****************************************************************///
  // render
  // ****************************************************************///

  render() {
    let createButton;
    const { ClickCloseForm, addLists } = this.props.actionMethod || ''
    

    // isStatusにすると解決前はfalseのためボタンがおかしくなる
    if (this.props.isOpenDetail && !this.props.isFormOpen) {
      console.log(this.props.test, 'TESTTEST1111')
      if (this.props.login_user === this.props.detail_todolist.username) {
        console.log(this.props.test, 'TESTTEST2222')
        createButton = (
          <div className="button-wrapper">
            <button onClick={this.props.actionMethod.hiddenDetail} className="button">解決投稿</button>
            {/* <button onClick={this.props.resolveFormOpen} className="button">解決投稿</button> */}
          </div>
        );}
      } else {
        console.log(this.props.test, 'TESTTEST3333')
        createButton = (
          <div className="button-wrapper">
            <button onClick={ClickCloseForm} className="first-button button">キャンセル</button>
            <Popover
              isOpen={this.state.isOpen}
              body={
                // this.props.displayForm
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
                // this.props.displayForm
                this.props.isStatus
                  ? <button onClick={this.submit} type="submit" className="button">投稿</button>
                  : <button onClick={this.submit} type="submit" className="button">投稿</button>
                  // : <button disabled={!this.props.canSubmit} onClick={this.submit} type="submit" className="button">投稿</button>
                  // statusがflaseの場合はチェックをかける。解決を修正する場合不要
                  // : <button disabled={!this.props.canSubmit()} onClick={this.submit} type="submit" className="button">投稿</button>
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