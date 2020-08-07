import React from 'react';
import FormButton from './FormButton';
import Display from './Display';
import Form from './Form';
import Axios from 'axios';
// import AxiosBase from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
import EditorJs from 'react-editor-js';
import { CircularProgress } from '@material-ui/core';

import { EDITOR_JS_TOOLS } from "./editor-tool";


// ****************************************************************///
// LISTの詳細
// ****************************************************************///


// const Axios = AxiosBase.create({
//     baseURL: "https://troument-api.net"
// });


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateFormOpen: false,
            // worry_id: this.props.detail_todolist.worry_id,
            // _id: this.props.detail_todolist._id,
            isDeleteDialogOpen: false,
            // isDetailOpen: false,
            isGoodCheck: false,
            isOpenDetail: this.props.isOpenDetail,
            isStatus: this.props.detail_todolist.status,
            detail_todolist: this.props.detail_todolist
        }
        // this.resolveFormOpen = this.resolveFormOpen.bind(this)
        this.listDelete = this.listDelete.bind(this)
        // this.updateFormOpen = this.updateFormOpen.bind(this)
        this.deleteDialogOpen = this.deleteDialogOpen.bind(this)
        this.goodCheck = this.goodCheck.bind(this)
    }

    // ****************************************************************///
    // 詳細を取得
    // ****************************************************************///

    componentDidMount() {
        this.getDetailTodolist()
    }


    // ****************************************************************///
    // 詳細を取得
    // ****************************************************************///

    getDetailTodolist() {
        const param = {
            worry_id: this.state.detail_todolist.worry_id,
            _id: this.state.detail_todolist._id,
            username: this.props.login_user,
        }
        this.goodCheck(param)

        // Axios.get('/api/detail_display', { params: param })
        //     .then(response => {
        //         this.setState((state) => {
        //             return {
        //                 data_worry: response.data.worry,
        //                 data_resolve: response.data.resolve,
        //             }
        //         })

        //     }
        //     )
        //     .catch(err => {
        //         console.error(new Error(err))
        //     })

    }

    // ****************************************************************///
    // グッドをしたことがあるかチェック
    // ****************************************************************///

    goodCheck(param) {
        Axios.get('/api/goodcheck', { params: param })
            .then(response => {
                if (response.data.length === 0) {
                    this.setState({
                        isGood: false,
                        isGoodCheck: true
                    })
                } else {
                    this.setState({
                        isGood: true,
                        isGoodCheck: true
                    })
                }
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }


    // ****************************************************************///
    // リストから消去  (state)
    // ****************************************************************///

    listDelete() {
        this.props.actionMethod.TodolistsDelete(this.state.detail_todolist.worry_id)

        Axios.delete('/api/delete', {
            data: { worry_id: this.state.detail_todolist.worry_id }
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })

        this.props.actionMethod.ClickCloseForm()
    }



    // ****************************************************************///
    // 詳細ページを表示する
    // ****************************************************************///

    // resolveFormOpen() {
    //     this.setState(
    //         {
    //             isOpenDetail: false,
    //             isResolveFormOpen: true
    //         }
    //     )
    // }

    // ****************************************************************///
    // 投稿したものを編集するフォームを表示
    // ****************************************************************///

    // updateFormOpen() {
    //     this.setState(
    //         {
    //             isResolveFormOpen: true,
    //             isUpdateFormOpen: true
    //         }
    //     )
    // }
    // ****************************************************************///
    // 投稿したものを編集するフォームを閉じる
    // ****************************************************************///

    // updateFormClose() {
    //     this.setState(
    //         {
    //             // form: true,
    //             isUpdateFormOpen: false
    //         }
    //     )
    // }

    // ****************************************************************///
    // 投稿したものを削除するとき、モーダルを表示する
    // ****************************************************************///

    deleteDialogOpen = () => {
        this.setState(
            {
                isDeleteDialogOpen: true
            }
        )
    };

    // ****************************************************************///
    // 削除時のモーダルを閉じる 
    // ****************************************************************///

    deleteDialogClose = () => {
        this.setState(
            {
                isDeleteDialogOpen: false
            }
        )
    };

    // ****************************************************************///
    // 悩みの詳細を表示
    // ****************************************************************///

    // ClickDetailOpen = () => {
    //     this.setState(
    //         {
    //             isDetailOpen: true
    //         }
    //     )
    // };

    // ****************************************************************///
    // 悩みの詳細を閉じる
    // ****************************************************************///

    // CliskcDetailClose = () => {
    //     this.setState(
    //         {
    //             isDetailOpen: false
    //         }
    //     )
    // };


    // ****************************************************************///
    // render
    // ****************************************************************///    

    render() {
        let createDetail;
        let detailDisplay
        let login_user = this.props.login_user

        // if (this.state.isResolveFormOpen) {
        //     this.state.isUpdateFormOpen
        //     ? detailDisplay = (
        //             <Form
        //                 {...this.props}
        //                 isResolveFormOpen={this.state.isResolveFormOpen}
        //                 isUpdateFormOpen={this.state.isUpdateFormOpen}
        //                 detail_todolist={this.state.detail_todolist}
        //                 isStatus={this.state.isStatus}
        //             />
        //         )
        //         : detailDisplay = (
        //             <Form
        //                 {...this.props}
        //                 isResolveFormOpen={this.state.isResolveFormOpen}
        //                 isStatus={this.state.isStatus}
        //                 isOpenDetail={this.state.isOpenDetail}
        //             />
        //         )
        // } else {
            // 詳細の画面かたformがfalseの時、goodしてるかどうかを判定できたら表示
            if (this.state.isGoodCheck) {

                // 詳細の画面かたformがfalseの時、詳細の画面を表示する
                // その時STATUSの状態で画面を表示
                // if (status) {
                if (this.state.isStatus) {
                    createDetail = (
                        <React.Fragment>

                            <div className="detail-wrapper">
                                <section className="detail-section">
                                    <div className="detail-area">
                                        <h1 className="detail-header">
                                            悩みの詳細
                                            </h1>
                                        <EditorJs holder="worry" data={this.state.detail_todolist.worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                        {/* <EditorJs holder="worry" data={this.state.data_worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}> */}
                                            <div id="worry" />
                                        </EditorJs>
                                    </div>
                                    <h1 className="detail-header">
                                        解決詳細
                                            </h1>
                                    <div className="detail-area">
                                        <EditorJs holder="resolve" data={this.state.detail_todolist.resolve} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                        {/* <EditorJs holder="resolve" data={this.state.data_resolve} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}> */}
                                            <div id="resolve" />
                                        </EditorJs>
                                    </div>
                                </section>
                            </div>
                        </React.Fragment>
                    )
                } else {
                    createDetail = (
                        <React.Fragment>
                            <div className="detail-wrapper">
                                <section className="detail-section">
                                    <h1 className="detail-section">
                                        悩み中
                                            </h1>
                                </section>
                                <div className="detail-area">
                                    <EditorJs holder="custom" data={this.state.detail_todolist.worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                    {/* <EditorJs holder="custom" data={this.state.data_worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}> */}
                                        <div id="custom" />
                                    </EditorJs>
                                </div>
                                <FormButton
                                    // resolveFormOpen={this.resolveFormOpen}
                                    // addLists={this.props.actionMethod.addLists}
                                    // worryUpdate={this.props.actionMethod.worryUpdate}
                                    actionMethod={this.props.actionMethod}
                                    isStatus={this.state.isStatus}
                                    detail_todolist={this.props.detail_todolist}
                                    login_user={login_user}
                                    isUpdateFormOpen={this.state.isUpdateFormOpen}
                                    isOpenDetail={this.state.isOpenDetail}
                                />
                            </div>
                        </React.Fragment>
                    )
                }
            } else {
                createDetail = (
                    <CircularProgress />
                )
            }
        // }


        return (

            <React.Fragment>
                <Display
                    {...this.props}
                    isOpenDetail={this.props.isOpenDetail}
                    isGood={this.state.isGood}
                    isUpdateFormOpen={this.state.isUpdateFormOpen}

                    deleteDialogOpen={this.deleteDialogOpen}
                    actionMethod={this.props.actionMethod}

                    _id={this.state.detail_todolist._id}
                />
                {/* {this.state.isGoodCheck
                    ? <Display
                        {...this.props}
                        isOpenDetail={true}
                        isGood={this.state.isGood}
                        isUpdateFormOpen={this.state.isUpdateFormOpen}

                        updateFormOpen={this.updateFormOpen}
                        deleteDialogOpen={this.deleteDialogOpen}

                        _id={this.state._id}
                    />
                  : <CircularProgress />
                } */}

                {detailDisplay}
                {createDetail}

                <Dialog
                    open={this.state.isDeleteDialogOpen}
                    onClose={this.deleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.isStatus ? "解決したものを削除しようとしています" : "悩み中のものを削除しようとしています"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            削除してもよろしいですか？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteDialogClose} color="primary">
                            キャンセル
                        </Button>
                        <Button onClick={this.listDelete} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>


            </React.Fragment>
        );
    }
}

export default Detail;