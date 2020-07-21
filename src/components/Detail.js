import React from 'react';
import FormButton from './FormButton';
import Display from './Display';
import Form from './Form';
// import Axios from 'axios';
import AxiosBase from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditorJs from 'react-editor-js';
import { CircularProgress } from '@material-ui/core';

import { EDITOR_JS_TOOLS } from "./editor-tool";


// ****************************************************************///
// LISTの詳細
// ****************************************************************///


const Axios = AxiosBase.create({
    baseURL: "https://troument-api.net"
});


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateform: false,
            worry_id: this.props.detail_todolist.worry_id,
            _id: this.props.detail_todolist._id,
            setOpen: false,
            detailOpen: false,
            spnner: false
        }
        this.ClickDisplayForm = this.ClickDisplayForm.bind(this)
        this.listDelete = this.listDelete.bind(this)
        this.ClickDetailUpdate = this.ClickDetailUpdate.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
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
            worry_id: this.state.worry_id,
            _id: this.state._id,
            username: this.props.login_user,
        }
        this.goodCheck(param)

        // const url = constUrl + '/api/detail_display'
        Axios.get('/api/detail_display', { params: param })
            .then(response => {
                this.setState((state) => {
                    return {
                        data_worry: response.data.worry,
                        data_resolve: response.data.resolve,
                    }
                })

            }
            )
            .catch(err => {
                console.error(new Error(err))
            })

    }

    // ****************************************************************///
    // グッドをしたことがあるかチェック
    // ****************************************************************///

    goodCheck(param) {
        // const url = constUrl + '/api/goodcheck'
        Axios.get('/api/goodcheck', { params: param })
            .then(response => {
                if (response.data.length === 0) {
                    this.setState({
                        isGood: false,
                        spnner: true
                    })
                } else {
                    this.setState({
                        isGood: true,
                        spnner: true
                    })
                }
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }


    // ****************************************************************///
    // リストから消去  
    // ****************************************************************///

    listDelete() {
        this.props.TodolistsDelete(this.state.worry_id)

        // const url = constUrl + '/api/delete'
        Axios.delete('/api/delete', {
            data: { worry_id: this.state.worry_id }
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })

        this.props.ClickCloseForm()
    }



    // ****************************************************************///
    // 詳細ページを閉じる
    // ****************************************************************///

    ClickDisplayForm() {
        this.setState(
            {
                form: true
            }
        )
    }

    // ****************************************************************///
    // 編集フォームを開く
    // ****************************************************************///

    ClickDetailUpdate() {
        this.setState(
            {
                form: true,
                updateform: true
            }
        )
    }

    // ****************************************************************///
    // 削除時、ポップアップを表示する
    // ****************************************************************///

    handleClickOpen = () => {
        this.setState(
            {
                setOpen: true
            }
        )
    };

    // ****************************************************************///
    // 削除時、ポップアップを閉じる
    // ****************************************************************///

    handleClose = () => {
        this.setState(
            {
                setOpen: false
            }
        )
    };

    // ****************************************************************///
    // 悩みの詳細を表示
    // ****************************************************************///

    ClickDetailOpen = () => {
        this.setState(
            {
                detailOpen: true
            }
        )
    };

    // ****************************************************************///
    // 悩みの詳細を閉じる
    // ****************************************************************///

    CliskcDetailClose = () => {
        this.setState(
            {
                detailOpen: false
            }
        )
    };


    // ****************************************************************///
    // render
    // ****************************************************************///    

    render() {
        let createDetail;
        let detailDisplay
        const { title, tag, count, worry_id, worry, time, status, username } = this.props.detail_todolist
        const { thumbnail } = this.props.detail_todolist.user
        let login_user = this.props.login_user

        if (this.state.form) {
            this.state.updateform
                ? detailDisplay = (
                    <Form
                        displayForm={status}
                        title={title}
                        tags={tag}
                        worry={worry}
                        worryUpdate={this.props.worryUpdate}
                        resolveUpdate={this.props.resolveUpdate}
                        resolveAdd={this.props.resolveAdd}
                        ClickCloseForm={this.props.ClickCloseForm}
                        data_worry={this.state.data_worry}
                        data_resolve={this.state.data_resolve}
                        detail_todolist={this.props.detail_todolist}
                        login_user={login_user}
                    />
                )
                : detailDisplay = (
                    <Form
                        displayForm={true}
                        ClickCloseForm={this.props.ClickCloseForm}
                        title={title}
                        tag={tag}
                        resolveAdd={this.props.resolveAdd}
                        detail_todolist={this.props.detail_todolist}
                        login_user={login_user}
                    />
                )
        } else {
            if (this.state.spnner) {

                if (status) {
                    createDetail = (
                        <div>

                            <div className="detail-wrapper">
                                <section className="detail-section">
                                    <div className="detail-area">
                                        <h1 className="detail-header">
                                            悩みの詳細
                                            </h1>
                                        <EditorJs holder="worry" data={this.state.data_worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                            <div id="worry" />
                                        </EditorJs>
                                    </div>
                                    <h1 className="detail-header">
                                        解決詳細
                                            </h1>
                                    <div className="detail-area">
                                        <EditorJs holder="resolve" data={this.state.data_resolve} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                            <div id="resolve" />
                                        </EditorJs>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )
                } else {

                    createDetail = (
                        <div>
                            <div className="detail-wrapper">
                                <section className="detail-section">
                                    <h1 className="detail-section">
                                        悩み中
                                            </h1>
                                </section>
                                <div className="detail-area">
                                    <EditorJs holder="custom" data={this.state.data_worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                        <div id="custom" />
                                    </EditorJs>
                                </div>
                                <FormButton
                                    ClickDisplayForm={this.ClickDisplayForm}
                                    state={status}
                                    detail_todolist={this.props.detail_todolist}
                                    login_user={login_user}
                                />
                            </div>
                        </div>
                    )
                }
            } else {
                createDetail = (
                    <CircularProgress />
                )
            }
        }


        return (
            <div>
                {this.state.spnner
                    ? <Display
                        title={title}
                        tag={tag}
                        count={count}
                        worry_id={worry_id}
                        worry={worry}
                        time={time}
                        status={status}
                        username={username}
                        detail={true}
                        login_user={login_user}
                        thumbnail={thumbnail}
                        isGood={this.state.isGood}
                        ClickDetailUpdate={this.ClickDetailUpdate}
                        listDelete={this.listDelete}
                        handleClickOpen={this.handleClickOpen}
                        ClickDetailOpen={this.ClickDetailOpen}
                        updateform={this.state.updateform}
                        handleGoodCount={this.props.handleGoodCount}
                        goodCheck={this.goodCheck}
                        createTime={this.props.createTime}
                        _id={this.state._id}
                    />
                    : <CircularProgress />
                }

                {detailDisplay}
                {createDetail}

                <Dialog
                    open={this.state.setOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{status ? "解決したものを削除しようとしています" : "悩み中のものを削除しようとしています"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            削除してもよろしいですか？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            キャンセル
                        </Button>
                        <Button onClick={this.listDelete} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.detailOpen}
                    onClose={this.CliskcDetailClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.detailOpen}>
                        <div className="modal">
                            <h2 className="modal-header" id="transition-modal-title">悩みの詳細</h2>
                            <EditorJs data={this.state.data_worry} tools={EDITOR_JS_TOOLS} enableReInitialize={true} />
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default Detail;