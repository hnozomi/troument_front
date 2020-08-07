import React from 'react';
import FormButton from './FormButton';
import Display from './Display';
import Axios from 'axios';
// import AxiosBase from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            isDeleteDialogOpen: false,
            isGoodCheck: false,
            isOpenDetail: this.props.isOpenDetail,
            isStatus: this.props.detail_todolist.status,
            detail_todolist: this.props.detail_todolist
        }
        this.listDelete = this.listDelete.bind(this)
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
    // render
    // ****************************************************************///    

    render() {
        let createDetail;
        let detailDisplay
        let login_user = this.props.login_user

        if (this.state.isGoodCheck) {

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
                                    <div id="custom" />
                                </EditorJs>
                            </div>
                            <FormButton
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