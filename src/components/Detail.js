import React from 'react';
import FormButton from './FormButton';
import Display from './Display';
// import Axios from 'axios';
import AxiosBase from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditorJs from 'react-editor-js';

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
            isUpdateFormOpen: false,
            isDeleteDialogOpen: false,
            isGoodCheck: false,
            isGood: false,
            isOpenDetail: this.props.isOpenDetail,
            isStatus: this.props.detail_todolist.status,
            detail_todolist: this.props.detail_todolist
        }
        this.listDelete = this.listDelete.bind(this)
        this.deleteDialogOpen = this.deleteDialogOpen.bind(this)
    }

    // ****************************************************************///
    // 投稿した内容をリストから消去
    // ****************************************************************///

    listDelete() {
        this.props.actionMethod.handleTodolistsDelete(this.state.detail_todolist.worry_id)

        Axios.delete('/api/delete', {
            data: { worry_id: this.state.detail_todolist.worry_id }
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })

        this.props.actionMethod.clickFormClose()
    }

    // ****************************************************************///
    // 投稿したものを削除するとき、モーダルを表示する (実行)
    // ****************************************************************///

    deleteDialogOpen = () => {
        this.setState(
            {
                isDeleteDialogOpen: true
            }
        )
    };

    // ****************************************************************///
    // 削除時のモーダルを閉じる (キャンセル)
    // ****************************************************************///

    deleteDialogClose = () => {
        this.setState(
            {
                isDeleteDialogOpen: false
            }
        )
    };

    // ****************************************************************///
    // Editor.js readonly対応
    // ****************************************************************///

    getReadOnly = () => {
        let worryElements = document.getElementById("worry"); // id of editor element
        let resolveElements = document.getElementById("resolve"); // id of editor element

        // worryElements.style.pointerEvents = "none";
        let editable_elements = worryElements.querySelectorAll("[contenteditable=true]");
        editable_elements.forEach(el => el.removeAttribute("contenteditable"))
        
        try {
            let editable_elements = resolveElements.querySelectorAll("[contenteditable=true]");
            editable_elements.forEach(el => el.removeAttribute("contenteditable"))
            // resolveElements.style.pointerEvents = "none";
        } catch (e) {
            
        }

        let tool = document.querySelectorAll(".ce-toolbar");
        for (let i = 0; i < tool.length; i++) {
            tool[i].style.display = "none"
        }
    }

    // ****************************************************************///
    // レンダリング
    // ****************************************************************///    

    render() {

        let createDetail;
        let login_user = this.props.login_user

        if (this.state.isStatus) {
            createDetail = (
                <React.Fragment>
                    <div className="detail-wrapper">
                        <section>
                            <h1 className="detail-section">
                                悩みの詳細
                            </h1>
                        </section>
                        <div className="detail-area">
                            <EditorJs onReady={this.getReadOnly} holder="worry" data={this.state.detail_todolist.worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                <div id="worry" />
                            </EditorJs>
                        </div>
                        <section>
                            <h1 className="detail-section">
                                解決詳細
                             </h1>
                        </section>
                        <div className="detail-area">
                            <EditorJs holder="resolve" data={this.state.detail_todolist.resolve} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                <div id="resolve" />
                            </EditorJs>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            createDetail = (
                <React.Fragment>
                    <div className="detail-wrapper">
                        <section>
                            <h1 className="detail-section">
                                悩み中
                            </h1>
                        </section>
                        <div className="detail-area">
                            <EditorJs onReady={this.getReadOnly} holder="worry" data={this.state.detail_todolist.worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                <div id="worry" />
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

        return (
            // <React.Fragment>
            <div className="display-title-wrapper">
                <Display
                    {...this.props}
                    isOpenDetail={this.props.isOpenDetail}
                    isGood={this.state.isGood}
                    isUpdateFormOpen={this.state.isUpdateFormOpen}

                    deleteDialogOpen={this.deleteDialogOpen}
                    goodCheck={this.goodCheck}
                    actionMethod={this.props.actionMethod}

                    _id={this.state.detail_todolist._id}
                />

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

            </div >
            // </React.Fragment>
        );
    }
}

export default Detail;