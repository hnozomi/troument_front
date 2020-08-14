import React from 'react';
import Navigation from './Navigation';
import Display from './Display';
import Form from './Form';
import Detail from './Detail';
import Notify from './Notify';
import Search from './Search';
import Mypage from './Mypage';
import Auth from './Auth';
import User from './User';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
// import AxiosBase from 'axios';
import Axios from 'axios';

import PostAddIcon from '@material-ui/icons/PostAdd';

// ****************************************************************///
//  初期画面
// ****************************************************************///

// const Axios = AxiosBase.create({
//     baseURL: "https://troument-api.net"
//   });


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpen: false,
            isResolveFormOpen: false,
            todolists: [] || this.props.todolists,
            userinfo: [] || this.props.userinfo,
            isOpenDetail: false,
            popover: false,
            isGood: false,
            loading: false

        }
        this.clickFormClose = this.clickFormClose.bind(this)
        this.handleWorryAdd = this.handleWorryAdd.bind(this)
        this.handleResolveAdd = this.handleResolveAdd.bind(this)
        this.displayDetail = this.displayDetail.bind(this)
        this.handleWorryUpdate = this.handleWorryUpdate.bind(this)
        this.handleResolveUpdate = this.handleResolveUpdate.bind(this)
        this.handleTodolistsDelete = this.handleTodolistsDelete.bind(this)
        this.createTime = this.createTime.bind(this)
        this.handleGoodCount = this.handleGoodCount.bind(this)
        this.gooStatusCheck = this.gooStatusCheck.bind(this)
        this.getTodolists = this.getTodolists.bind(this)
        this.updateFormOpen = this.updateFormOpen.bind(this)
        this.resolveFormOpen = this.resolveFormOpen.bind(this)
    }


    componentDidMount() {

        this.getTodolists()
        this.getUserinfo()

    }

    // ****************************************************************///
    // Todolistsの取得
    // ****************************************************************///

    getTodolists() {
        const login_user = User.LoggedUser()
        this.setState({
            login_user: login_user
        })
        Axios.get('/api/display')
            .then(response => {
                this.setState((state => {
                    return { todolists: response.data.reverse(), loading: true }
                })
                )
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }

    // ****************************************************************///
    // ログインしているユーザーの情報取得
    // ****************************************************************///

    getUserinfo() {
        const login_user = User.LoggedUser()
        const param = {
            username: login_user,
        }
        Axios.get('/api/userinfo', { params: param })
            .then(response => {
                this.setState((state => {
                    return { userinfo: response.data, loading: true }
                })
                )
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }

    // ****************************************************************///
    //  悩みを投稿  ホーム画面のボタンから投稿
    // ****************************************************************///

    async handleWorryAdd(title, tags, savedData) {
        this.setState((state => {
            return { loading: false }
        }))
        let time = this.createTime()

        this.clickFormClose()
        const shortid = require('shortid');
        let worry_id = shortid.generate()

        const list = {
            username: this.state.userinfo.user_name,
            title: title,
            tag: tags,
            worry: savedData,
            resolve: '',
            site: '',
            status: false,
            time: time,
            worry_id: worry_id
        }


        Axios.post('/api/worryadd', {
            list: list,
        })
            .then(response => {
                response.data.user = this.state.userinfo
                this.state.todolists.unshift(
                    response.data
                );
                this.setState((state => {
                    return { todolists: this.state.todolists, loading: true }
                }));
            })
            .catch(err => {
                console.error(new Error(err))
            })

    }


    // ****************************************************************///
    // 解決方法の投稿   detailコンポーネントのresolveAddから実行
    // ****************************************************************///

    async handleResolveAdd(savedData) {
        let time = this.createTime()

        await this.handleTodolistsDelete(this.state.detail_todolist.worry_id)
        let detail_todolist = this.state.detail_todolist

        detail_todolist.resolve = savedData
        detail_todolist.status = true
        detail_todolist.time = time

        this.state.todolists.unshift(detail_todolist);
        this.setState((state => {
            return { todolists: this.state.todolists }
        })
        );

        Axios.put('/api/resolveadd', {
            resolve: savedData,
            worry_id: this.state.detail_todolist.worry_id,
            status: true,
            time: time
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })

        this.clickFormClose()
    }

    // ****************************************************************///
    // 　選択された投稿をtodolistsから削除する state
    // ****************************************************************///


    async handleTodolistsDelete(worry_id) {
        const new_todolists =
            this.state.todolists.filter((todolist) => {
                return todolist.worry_id !== worry_id
            })
        this.setState(
            {
                todolists: new_todolists
            }
        )

    }

    // ****************************************************************///
    // 悩みの編集 Detailコンポーネントの1worryUpdateから実行
    // ****************************************************************///

    async handleWorryUpdate(title, tag, savedData) {
        let time = this.createTime()
        await this.handleTodolistsDelete(this.state.detail_todolist.worry_id)

        let detail_todolist = this.state.detail_todolist

        detail_todolist.title = title
        detail_todolist.tag = tag
        detail_todolist.worry = savedData
        detail_todolist.time = time

        this.state.todolists.unshift(detail_todolist);
        this.setState((state => {
            return { todolists: this.state.todolists }
        })
        );
        // const url = constUrl + '/api/listupdate'
        Axios.post('/api/listupdate', {
            detail_todolist: this.state.detail_todolist,
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })


        this.clickFormClose()

    }

    // ****************************************************************///
    // 解決の編集DetailコンポーネントのresolveUpdateから実行
    // ****************************************************************///

    async handleResolveUpdate(savedData) {
        let time = this.createTime()
        await this.handleTodolistsDelete(this.state.detail_todolist.worry_id)


        let detail_todolist = this.state.detail_todolist

        detail_todolist.resolve = savedData
        detail_todolist.time = time

        this.state.todolists.unshift(detail_todolist);
        this.setState((state => {
            return { todolists: this.state.todolists }
        })
        );

        Axios.post('/api/listupdate', {
            detail_todolist: this.state.detail_todolist,
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })

        this.clickFormClose()
    }


    // ****************************************************************///
    // worry_idが一致する詳細を表示
    // ****************************************************************///

    displayDetail(worry_id) {

        const detail_todolist =
            this.state.todolists.filter((todolist) => {
                return todolist.worry_id === worry_id
            })

        this.setState({
            isOpenDetail: true,
            detail_todolist: detail_todolist[0],
        })
    }

    // ****************************************************************///
    // 解決ボタンが押された時に実行
    // ****************************************************************///

    resolveFormOpen() {
        this.setState({
            isResolveFormOpen: true,
            isFormOpen: true
        })
    }


    // ****************************************************************///
    // 悩み・解決を投稿するFormを表示
    // ****************************************************************///

    postFormOpen = () => {
        this.setState(
            {
                isFormOpen: true
            }
        )
    }

    // ****************************************************************///
    // 悩み・解決を投稿するFormをクローズ. 投稿後のポップアップ表示
    // ****************************************************************///

    clickFormClose() {

        this.setState(
            {
                isResolveFormOpen: false,
                isUpdateFormOpen: false,
                isFormOpen: false,
                isOpenDetail: false,
                pop_open: true,
            }
        )
    }

    // ****************************************************************///
    // 投稿したものを編集するフォームを表示
    // ****************************************************************///

    updateFormOpen() {
        this.setState(
            {
                isFormOpen: true,
                isUpdateFormOpen: true
            }
        )
    }


    // ****************************************************************///
    //  時間のFormatを変換 
    // ****************************************************************///

    createTime(time) {
        let now_time

        if (time) {
            now_time = new Date(time)
            now_time = now_time.toLocaleString()
        } else {
            now_time = new Date()
        }

        return now_time
    }


    // ****************************************************************///
    //  goodの確認
    // ****************************************************************///

    handleGoodCount(_id, isGood) {
        this.gooStatusCheck(_id, isGood)
    }

    // ****************************************************************///
    // goodした履歴があるかチェック
    // ****************************************************************///

    async gooStatusCheck(_id, isGood) {

        if (isGood) {
            this.goodDeleteCheck(_id)
        } else {
            this.goodAddCheck(_id)
        }
    }

    // ****************************************************************///
    //  goodした履歴がない場合追加する
    // ****************************************************************///

    async goodAddCheck(_id) {
        let CountUp = []
        CountUp = this.state.detail_todolist
        CountUp.count = CountUp.count + 1
        CountUp.user.goodlist.push(_id)
        
        this.setState((state => {
            return {
                detail_todolist: CountUp
            }
        })
        )
        
        const param = {
            _id: _id,
            username: this.state.login_user,
            count: this.state.detail_todolist.count
        }
        
        Axios.get('/api/goodadd', {
            params: param
        })
        .then(response => {
        })
        .catch(err => {
            console.error(new Error(err))
        })
    }
    
    // ****************************************************************///
    // goodした履歴がある場合、削除
    // ****************************************************************///
    
    async goodDeleteCheck(_id) {
        let CountUp = []
        CountUp = this.state.detail_todolist
        CountUp.count = CountUp.count - 1

        
        const goodcheck =
        this.state.detail_todolist.user.goodlist.findIndex((good) => {
            return good === _id
        })

        CountUp.user.goodlist.splice(goodcheck, 1)

        this.setState((state => {
            return {
                detail_todolist: CountUp
            }
        })
        )
        const param = {
            _id: _id,
            username: this.state.login_user,
            count: this.state.detail_todolist.count
        }

        Axios.get('/api/gooddelete', { params: param })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }

    // ****************************************************************///
    // render    stateとpropsに変化があった場合に呼び出される
    // ****************************************************************///

    render() {
        let homeDisplay
        const actionMethod = {
            handleResolveAdd: this.handleResolveAdd,
            handleWorryUpdate: this.handleWorryUpdate,
            handleResolveUpdate: this.handleResolveUpdate,
            handleTodolistsDelete: this.handleTodolistsDelete,
            clickFormClose: this.clickFormClose,
            postFormOpen: this.postFormOpen,
            createTime: this.createTime,
            handleGoodCount: this.handleGoodCount,
            goodAddCheck: this.goodAddCheck,
            goodDeleteCheck: this.goodDeleteCheck,
            displayDetail: this.displayDetail,
            handleWorryAdd: this.handleWorryAdd,
            updateFormOpen: this.updateFormOpen,
            resolveFormOpen: this.resolveFormOpen
        }


        if (this.state.isFormOpen) {

            this.state.isOpenDetail

                ? homeDisplay = (
                    <React.Fragment>
                    <Display
                    {...this.props}
                    isOpenDetail={this.state.isOpenDetail}
                    isGood={this.state.isGood}
                    detail_todolist={this.state.detail_todolist}
                    isUpdateFormOpen={this.state.isUpdateFormOpen}

                    deleteDialogOpen={this.deleteDialogOpen}
                    actionMethod={actionMethod}

                    _id={this.state.detail_todolist._id}
                />
                    <Form
                        isUpdateFormOpen={this.state.isUpdateFormOpen}
                        detail_todolist={this.state.detail_todolist}
                        isOpenDetail={this.state.isOpenDetail}
                        actionMethod={actionMethod}
                        isFormOpen={this.state.isFormOpen}
                        isResolveFormOpen={this.state.isResolveFormOpen}
                    />
                    </React.Fragment>
                )
                : homeDisplay = (
                    <Form
                        isOpenDetail={this.state.isOpenDetail}
                        login_user={this.state.login_user}
                        actionMethod={actionMethod}
                    />
                )

        } else {
            if (this.state.isOpenDetail) {
                homeDisplay = (
                    <Detail
                        todolists={this.state.todolists}
                        detail_todolist={this.state.detail_todolist}
                        count={this.state.count}
                        login_user={this.state.login_user}
                        isOpenDetail={this.state.isOpenDetail}
                        actionMethod={actionMethod}
                    />
                )

            } else {
                this.state.loading
                    ? homeDisplay = (
                        <div className="display-title-wrapper">
                            <Display
                                todolists={this.state.todolists}
                                userinfo={this.state.userinfo}
                                actionMethod={actionMethod}
                            />


                            {/* <div onClick={this.postFormOpen} className="create-form">
                                <img alt="CreateForm" src="/icon/create-form.svg" className="create-form-icon" />
                            </div> */}
                            {/* <div onClick={this.postFormOpen} className="create-form-PC">
                                投稿する
                                <PostAddIcon fontSize="small"/>
                                <p className="create-form-text-PC">投稿する</p>
                                <img alt="CreateForm" src="/icon/create-form.svg" className="create-form-icon" />
                            </div> */}

                        </div>
                    )
                    : homeDisplay = (
                        <CircularProgress />
                    )
            }
        }

        return (
            <Router>
                <Auth>
                    <Switch>

                        <Route exact path='/'>

                            {homeDisplay}

                        </Route>

                        <Route exact path='/Search'
                            render={props => <Search todolists={this.state.todolists} loginuser={this.state.username} actionMethod={actionMethod} />} />

                        <Route exact path='/Notify'>
                            <Notify />
                        </Route>


                        <Route exact path='/Mypage'
                            render={props => <Mypage getTodolists={this.getTodolists} getUserinfo={this.getUserinfo} userinfo={this.state.userinfo} todolists={this.state.todolists} loginuser={this.state.login_user} actionMethod={actionMethod} />} />

                    </Switch>
                </Auth>

                <Navigation
                    clickFormClose={this.clickFormClose}
                    postFormOpen={this.postFormOpen}
                    SearchList={this.SearchList}
                    todolists={this.state.todolists}
                />

            </Router>
        )

    }

}


export default Home;