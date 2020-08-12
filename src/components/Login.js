import React from 'react';
import './Toppage.css'
import Validation from './Validation';
import User from './User';
import Axios from 'axios';
// import AxiosBase from 'axios';
import { withRouter, Link } from "react-router-dom";
import Popover from "react-popover";

const description = {
    marginTop: 20,
    fontSize: 12,
}

const descriptiontext = {
    margin: 0
}


// const Axios = AxiosBase.create({
//     baseURL: "https://troument-api.net"
//   });

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {
                account: '',
                password: '',
            },

            message: {
                account: '',
                password: '',
            },
            loading: false,
            isOpen: false,
        }
        this.loginUser = this.loginUser.bind(this)
    }

    loginUser = async (event) => {
        event.preventDefault();
        const params = {
            user_name: this.state.input.account,
            password: this.state.input.password,
        }
        Axios.get('/api/user_login', {
            params: params,
          })
          .then(response => {
            if (response.data === '') {
              this.setState({
                isOpen: !this.state.isOpen,
              })
            } else {
                User.login(this.state.input.account, this.state.input.password);
                this.props.history.push({
                    pathname: '/'
                })
            }
          })
          .catch(err => {
            console.error(new Error(err))
          })
        }

    inputCheck(event) {
        const key = event.target.name;
        const value = event.target.value;
        const { input, message } = this.state;
        this.setState({
            input: {
                ...input,
                [key]: event.target.value
            },
            message: {
                ...message,
                [key]: Validation.formValidate(key, value)
            }
        });
    };

    submitCheck = () => {
        let validInput;
        let validMessage;
        const { loading } = this.state;

        if (this.state.input.account === '' | this.state.input.password === '') {
            validInput = false
        } else {
            validInput = true
        }

        if (this.state.message.account !== "" | this.state.message.password !== "") {
            validMessage = false
        } else {
            validMessage = true
        }

        return validInput && validMessage && !loading && !this.state.isOpen
    };

    handleClose = () => {
        this.setState({
          isOpen: false,
        })
      };

    render() {
        return (

            <div className="wrappers">
                <div>
                    <h1 className="login">ログイン</h1>

                    <form className="account-form">
                        <div className="form-label-wrap">
                            <label className="account-form-label">アカウント名<span className="form-span">必須</span></label>
                            <Popover
                                isOpen={this.state.isOpen}
                                place={'above'}
                                body={
                                    <div className="popover">
                                        <p className="popover-text">アカウント名かパスワードに誤りがあります</p>
                                    </div>
                                }
                                enterExitTransitionDurationMs={800}
                            >
                                <input className="form-input"
                                    type="text"
                                    name="account"
                                    value={this.state.input.account}
                                    onChange={event => this.inputCheck(event)}
                                    onClick={this.handleClose}
                                ></input>
                            </Popover>
                            <span className="account-form-bg"></span>
                        </div>
                        <div className="form-label-wrap">
                            <label className="account-form-label">パスワード<span className="form-span">必須</span></label>
                            <input className="form-input"
                                type="text"
                                name="password"
                                value={this.state.input.password}
                                onChange={event => this.inputCheck(event)}
                            ></input>
                            <span className="account-form-bg"></span>
                        </div>
                        <button className="login-button"
                            type="submit"
                            disabled={!this.submitCheck()}
                            onClick={this.loginUser}
                        >ログイン</button>
                    </form>
                    <div style={description}>
                        <p style={descriptiontext}>アカウントは持っていますか？</p>
                        <p style={descriptiontext}>まだの方はこちらから登録お願いします ⇨ <Link to="/Register">会員登録</Link></p>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Login);
