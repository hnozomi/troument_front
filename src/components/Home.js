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
            form: false,
            todolists: [] || this.props.todolists,
            userinfo: [] || this.props.userinfo,
            detail: false,
            popover: false,
            isGood: false,
            loading: false

        }
        this.ClickCloseForm = this.ClickCloseForm.bind(this)
        this.addLists = this.addLists.bind(this)
        this.resolveAdd = this.resolveAdd.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
        this.worryUpdate = this.worryUpdate.bind(this)
        this.resolveUpdate = this.resolveUpdate.bind(this)
        this.TodolistsDelete = this.TodolistsDelete.bind(this)
        this.createTime = this.createTime.bind(this)
        this.handleGoodCount = this.handleGoodCount.bind(this)
        this.goodCheck = this.goodCheck.bind(this)
        this.getTodolists = this.getTodolists.bind(this)
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
        // const url = constUrl + '/api/display'
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
                    // return { userinfo: response.data[0], loading: true }
                })
                )
            })
            .catch(err => {
                console.error(new Error(err))
            })
            var time = this.createTime()
    }

    // ****************************************************************///
    //  悩みを投稿  ホーム画面のボタンから投稿
    // ****************************************************************///

    addLists(title, tags, savedData) {
        this.setState((state => {
            return { loading: false }
        }))
        var time = this.createTime()

        this.ClickCloseForm()
        console.log('AAA')
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

    resolveAdd(savedData) {
        var time = this.createTime()

        this.TodolistsDelete(this.state.detail_todolist.worry_id)
        var detail_todolist = this.state.detail_todolist

        detail_todolist.resolve = savedData
        detail_todolist.status = true
        detail_todolist.time = time

        this.state.todolists.unshift(detail_todolist);
        this.setState((state => {
            return { todolists: this.state.todolists }
        })
        );

        // const url = constUrl + '/api/resolveadd'
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

        this.ClickCloseForm()
    }

    // ****************************************************************///
    // 　選択された投稿をtodolistsから削除する state
    // ****************************************************************///


    TodolistsDelete(worry_id) {
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

    worryUpdate(title, tag, savedData) {
        var time = this.createTime()
        this.TodolistsDelete(this.state.detail_todolist.worry_id)

        var detail_todolist = this.state.detail_todolist

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


            this.ClickCloseForm()

    }

    // ****************************************************************///
    // 解決の編集DetailコンポーネントのresolveUpdateから実行
    // ****************************************************************///

    resolveUpdate(savedData) {
        var time = this.createTime()
        this.TodolistsDelete(this.state.detail_todolist.worry_id)


        var detail_todolist = this.state.detail_todolist

        detail_todolist.resolve = savedData
        detail_todolist.time = time

        this.state.todolists.unshift(detail_todolist);
        this.setState((state => {
            return { todolists: this.state.todolists }
        })
        );

        // const url = constUrl + '/api/listdelete'
        Axios.post('/api/listupdate', {
            detail_todolist: this.state.detail_todolist,
        })
            .then(response => {
            })
            .catch(err => {
                console.error(new Error(err))
            })

            this.ClickCloseForm()
    }


    // ****************************************************************///
    // woory_idが一致する詳細を表示
    // ****************************************************************///

    handleDetail(worry_id) {

        const detail_todolist =
            this.state.todolists.filter((todolist) => {
                return todolist.worry_id === worry_id
            })

        this.setState({
            detail: true,
            detail_todolist: detail_todolist[0],
            todolist: this.props.todolists,
        })
    }

    // ****************************************************************///
    // 悩み・解決を投稿するFormを表示
    // ****************************************************************///

    ClickDisplayForm = () => {
        this.setState(
            {
                form: true
            }
        )
    }

    // ****************************************************************///
    // 悩み・解決を投稿するFormをクローズ. 投稿後のポップアップ表示
    // ****************************************************************///

    ClickCloseForm() {

        this.setState(
            {
                form: false,
                detail: false,
                pop_open: true,
            }
        )
    }

    // ****************************************************************///
    //  時間のFormatを変換 
    // ****************************************************************///

    createTime(time) {

        if (time) {
            var now_time = new Date(time)
            var now_time = now_time.toLocaleString()
        } else {
            var now_time = new Date()
        }
        
        return now_time
    }


    // ****************************************************************///
    //  goodの確認
    // ****************************************************************///

    handleGoodCount(_id, isGood) {
        this.goodCheck(_id, isGood)
    }

    // ****************************************************************///
    // goodした履歴があるかチェック
    // ****************************************************************///

    async goodCheck(_id, isGood) {

        if (isGood) {
            this.gooddeleteCheck(_id)
        } else {
            this.goodaddCheck(_id)
        }
    }

    // ****************************************************************///
    //  goodした履歴がない場合追加する
    // ****************************************************************///

    async goodaddCheck(_id) {
        let CountUp = []
        CountUp = this.state.detail_todolist
        CountUp.count = CountUp.count + 1

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

        // const url = constUrl + '/api/goodadd'
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

    async gooddeleteCheck(_id) {
        let CountUp = []
        CountUp = this.state.detail_todolist
        CountUp.count = CountUp.count - 1

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

        // const url = constUrl + '/api/gooddelete'
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
            resolveAdd: this.resolveAdd,
            worryUpdate: this.worryUpdate,
            resolveUpdate: this.resolveUpdate,
            TodolistsDelete: this.TodolistsDelete,
            ClickCloseForm: this.ClickCloseForm,
            createTime: this.createTime,
            handleGoodCount: this.handleGoodCount,
            goodaddCheck: this.goodaddCheck,
            gooddeleteCheck: this.gooddeleteCheck,
            handleDetail:this.handleDetail,
            addLists: this.addLists
        }

        if (this.state.form) {
            console.log(this.state, 'state')
            homeDisplay = (
                <Form
                    // ClickCloseForm={this.ClickCloseForm}
                    // addLists={this.addLists}
                    login_user={this.state.login_user}
                    // detail_todolist={''}
                    // detail_todolist={this.state.detail_todolist}
                    actionMethod={actionMethod}
                />
            )
        } else {
            if (this.state.detail) {
                homeDisplay = (
                        <Detail
                            todolists={this.state.todolists}
                            detail_todolist={this.state.detail_todolist}
                            count={this.state.count}
                            login_user={this.state.login_user}
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


                            <div onClick={this.ClickDisplayForm} className="create-form">
                                <img alt="CreateForm" src="/icon/create-form.svg" className="create-form-icon" />
                            </div>

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
                            render={props => <Search todolists={this.state.todolists} loginuser={this.state.username} actionMethod={actionMethod}/>} />
                            {/* render={props => <Search todolists={this.state.todolists} loginuser={this.state.username} createTime={this.createTime} handleDetail={this.handleDetail} />} /> */}

                        <Route exact path='/Notify'>
                            <Notify />
                        </Route>


                        <Route exact path='/Mypage'
                            render={props => <Mypage getTodolists={this.getTodolists} getUserinfo={this.getUserinfo} userinfo={this.state.userinfo} todolists={this.state.todolists} loginuser={this.state.login_user} actionMethod={actionMethod} />} />
                            {/* render={props => <Mypage getTodolists={this.getTodolists} getUserinfo={this.getUserinfo} userinfo={this.state.userinfo} todolists={this.state.todolists} loginuser={this.state.login_user} createTime={this.createTime} handleDetail={this.handleDetail} />} /> */}


                    </Switch>
                </Auth>

                <Navigation
                    ClickCloseForm={this.ClickCloseForm}
                    SearchList={this.SearchList}
                    todolists={this.state.todolists}
                />

            </Router>
        )

    }

}


export default Home;