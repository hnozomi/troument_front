import React from 'react';
import Display from './Display';
import User from './User';
import AxiosBase from 'axios';
// import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Avatar from 'react-avatar';

const Axios = AxiosBase.create({
  baseURL: "https://troument-api.net"
});


class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultLists: [],
      todolists: [],
      worryCount: [],
      resolveCount: [],
      isActive: 0,
      open: false,
      files: [],
      userInfo: this.props.userinfo,
      // thumbnail: this.props.userinfo.thumbnail,
      isMypage: true,
      alltodolists: this.props.todolists,
      src: null,
      crop: {
        unit: '%',
        width: 30,
        aspect: 16 / 9,
      },
    }
    this.worryListDisplay = this.worryListDisplay.bind(this)
    this.resolveListDisplay = this.resolveListDisplay.bind(this)
    this.usefulListDisplay = this.usefulListDisplay.bind(this)
    this.getMypageTodolists = this.getMypageTodolists.bind(this)
  }


  componentDidMount() {
    this.getTodoListCount()
  }


  // ****************************************************************///
  // ログインしているユーザーのLISTデータ取得
  // ****************************************************************///

  async getTodoListCount() {

    await this.getMypageTodolists()

    const worryCount =
      this.state.todolists &&
      this.state.todolists.filter((todolist) => {
        return todolist.status === false
      }
      )

    const resolveCount =
      this.state.todolists &&
      this.state.todolists.filter((todolist) => {
        return todolist.status === true
      }
      )


    const filterList =
      this.state.todolists &&
      this.state.todolists.filter((todolist) => {
        return todolist.status === false
      }
      )

    this.setState({
      worryCount: worryCount,
      resolveCount: resolveCount,
      goodCount: this.state.goodlist.length || 0,
      resultLists: filterList,
    })

  }


  // ****************************************************************///
  // ログインしているユーザーのTodolistsの取得
  // ****************************************************************///

  async getMypageTodolists() {
    const login_user = User.LoggedUser()
    this.setState({
      username: login_user
    })
    const param = {
      username: login_user,
    }


    // ****************************************************************///
    // いいねしているデータを取得
    // ****************************************************************///

    await Axios.get('/api/mygoodinfo', { params: param })
      .then(response => {
        this.setState((state => {
          return { goodlist: response.data }
        })
        )
      })
      .catch(err => {
        console.error(new Error(err))
      })

    // ****************************************************************///
    // ログインユーザー情報からサムネイル取得
    // ****************************************************************///

    await Axios.get('/api/userinfo', { params: param })
      .then(response => {
        this.setState((state => {
          return { thumbnail: response.data.thumbnail }
        })
        )
      })
      .catch(err => {
        console.error(new Error(err))
      })

    // ****************************************************************///
    // ユーザー情報を関連つけたデータを取得
    // ****************************************************************///

    await Axios.get('/api/mypage', { params: param })
      .then(response => {
        this.setState((state => {
          return { todolists: response.data.reverse() }
          // return { todolists: response.data.reverse(), loading: true }
        })
        )
      })
      .catch(err => {
        console.error(new Error(err))
      })
  }



  // ****************************************************************///
  // 悩み中のリストを取得
  // ****************************************************************///

  worryListDisplay = () => {

    const filterList =
      this.state.todolists &&
      this.state.todolists.filter((todolist) => {
        return todolist.status === false
      }
      )
    this.setState({
      resultLists: filterList,
      isActive: 0
    })
  }

  // ****************************************************************///
  // 解決済のリストを取得
  // ****************************************************************///

  resolveListDisplay() {
    const filterList =
      this.state.todolists &&
      this.state.todolists.filter((todolist) => {
        return todolist.status === true
      }
      )
    this.setState({
      resultLists: filterList,
      isActive: 1
    }
    )
  }

  // ****************************************************************///
  // グッドしているリストを取得
  // ****************************************************************///

  usefulListDisplay() {
    if (this.state.goodlist) {
      this.setState({
        resultLists: this.state.goodlist,
        isActive: 2
      }
      )
    } else {
      this.setState({
        resultLists: [],
        isActive: 2
      }
      )
    }
  }

  // ****************************************************************///
  // トリミングされた画像を保存
  // ****************************************************************///

  sendPicToS3 = () => {
    const login_user = User.LoggedUser()
    this.setState({
      username: login_user
    })


    const formData = new FormData();
    formData.append('Files', this.state.croppedImageUrl)
    formData.append('username', this.state.username)

    Axios.post('/api/files',
      formData,
    ).then(response => {
      this.setState((state => {
        return { thumbnail: this.state.croppedImageUrl }
      }), () => this.handleReload()
      )
    }
    )

    this.setState({
      isPicOpen: false
    })
  }

  // ****************************************************************///
  // 選択された範囲でトリミングを実施  ライブラリ：react-image-crop
  // ****************************************************************///

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState((state => {
          return {
            src: reader.result,
            isPicOpen: true,
          }
        })
        )
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop, files) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        this.state.username
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/png');
    });
  }


  // ****************************************************************///
  // サムネイル更新後、情報再取得
  // ****************************************************************///

  handleReload() {
    this.props.getTodolists()
    this.getTodoListCount()
  }


  // ****************************************************************///
  // 画像のトリミングをキャンセル
  // ****************************************************************///

  canSendPic = () => {
    this.setState(
      {
        isPicOpen: false
      }
    )
  };

  // ****************************************************************///
  // render
  // ****************************************************************///

  render() {
    const { crop, src } = this.state;
    return (
      <React.Fragment>
        <div className="profile-wrapper">
          <div className="profile-header">
            <div className="profile">
              <label className="sample">
                <Avatar size={"50px"} round={"10px"} alt="PROFILE" src={"https://troument.s3-ap-northeast-1.amazonaws.com/" + this.state.thumbnail} />
                <input type="file" accept="image/*" onChange={this.onSelectFile} />
              </label>
              <p className="profile_name">{this.state.username}</p>
            </div>
            <div className="profile-count">
              <ul className="count-lists">
                <li className="count-list"><p className="count-list-number">{this.state.worryCount.length}</p><p className="count-list-text">悩み中</p></li>
                <li className="count-list"><p className="count-list-number">{this.state.resolveCount.length}</p><p className="count-list-text">解決済</p></li>
                <li className="count-list"><p className="count-list-number">{this.state.goodCount}</p><p className="count-list-text">スコア</p></li>
              </ul>
            </div>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.isPicOpen}
            onClose={this.CliskcPicClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.isPicOpen}>
              <div className="modal">
                <p>画像トリミング</p>
                {src && (
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                )}
                <button onClick={this.canSendPic}>キャンセル</button>
                <button onClick={this.sendPicToS3}>決定</button>
              </div>
            </Fade>
          </Modal>



          <div className="lists">
            <button className={"listbutton " + (this.state.isActive === 0 ? 'active' : '')}><span onClick={this.worryListDisplay} className="list worry-list">悩み一覧</span></button>
            <button className={"listbutton " + (this.state.isActive === 1 ? 'active' : '')}><span onClick={this.resolveListDisplay} className="list resolve-list">解決済一覧</span></button>
            <button className={"listbutton " + (this.state.isActive === 2 ? 'active' : '')}><span onClick={this.usefulListDisplay} className="list useful-list">役立ち一覧</span></button>
          </div>
        </div>
        <div className="display-title-wrapper">

          {this.state.resultLists
            ? <Display
              todolists={this.state.resultLists}

              actionMethod={this.props.actionMethod}
              isMypage={this.state.isMypage}
            />
            : <CircularProgress />
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Mypage;