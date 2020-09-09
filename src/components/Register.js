import React from 'react';
import './Toppage.css'
import Validation from './Validation';
// import AxiosBase from 'axios';
import Axios from 'axios';
import { withRouter } from "react-router-dom";
import Popover from "react-popover";


// const Axios = AxiosBase.create({
//   baseURL: "https://troument-api.net"
// });

class Register extends React.Component {
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
    this.createUser = this.createUser.bind(this)
  }

  createUser(event) {
    event.preventDefault();

    // const url = constUrl + '/api/user_create'
    Axios.post('/api/user_create', {
      user_name: this.state.input.account,
      password: this.state.input.password,
    })
      .then(response => {
        if (response.data === '同一のアカウント名が存在します') {
          this.setState({
            isOpen: !this.state.isOpen,
          })
        } else {
          this.props.history.push('/login')
        }
      })
      .catch(err => {
        console.error(new Error(err))
      })
  }

  inputCheck(event) {
    event.preventDefault();
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


//   clickHandle = () => {
//     this.handleClose();
//     this.setState({
//       isOpen: false,
//     })
// };

  render() {
    const { input, message } = this.state;
    return (

      <div className="wrappers">

        <div>
          <h1 className="create-account">アカウントを作成</h1>
          <form className="account-form">
            <div className="form-label-wrap">
              <section style={{ position: 'relative' }}>
                <label className="account-form-label">アカウント名<span className="form-span">必須</span></label>
                {message.account && (
                  <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, bottom: 0 }}>{message.account}</span>
                )}
              </section>
              <Popover
                isOpen={this.state.isOpen}
                place={'above'}
                body={
                  <div className="popover">
                  <p className="popover-text">同一のアカウント名が存在します</p>
                  <p className="popover-text">別のにしてください</p>
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
              <section style={{ position: 'relative' }}>
                {message.password && (
                  <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, bottom: 0 }}>{message.password}</span>
                )}
              </section>
              <input className="form-input"
                type="text"
                name="password"
                value={this.state.input.password}
                onChange={event => this.inputCheck(event)}
              >
              </input>
              <span className="account-form-bg"></span>
            </div>
            <button className="register-button"
              type="submit"
              disabled={!this.submitCheck()}
              onClick={this.createUser}
            >
              登録
            </button>
          </form>
        </div>

      </div >




    )
  }


}


export default withRouter(Register);
