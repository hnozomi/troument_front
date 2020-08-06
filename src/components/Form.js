import React from 'react';
import Validation from './Validation';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from "./editor-tool";

import ReactTags from 'react-tag-autocomplete'
import suggestions from './skill'
import FormButton from './FormButton';


class Form extends React.Component {
  constructor(props) {
    super(props);
    const { detail_todolist = '' } = this.props
    const { title = '', tag = '', worry = '', status = '' } = detail_todolist

    this.state = {
      clickbutton: false,
      form: true,
      input: {
        title: title,
      },
      message: {
        title: '',
        tag: '',
        worry: '',
        resolve: '',
      },
      isSending: false,
      tags: tag || [],
      savedData: worry,
      status: status,
      suggestions,
    }
    this.changeInputText = this.changeInputText.bind(this)
    this.canSubmit = this.canSubmit.bind(this)
    this.startSending = this.startSending.bind(this)
    this.endSending = this.endSending.bind(this)
    console.log(this.props, 'FORMのPROPS')
  }

  // ****************************************************************///
  // Formに入力されてる文字を反映
  // ****************************************************************///

  changeInputText(event) {
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

  // ****************************************************************///
  // Validation
  // ****************************************************************///

  canSubmit = () => {
    console.log(this.state, 'DDDD')
    let validInput;
    let validMessage;
    const { input, isSending } = this.state;

    if (this.state.input.title === '') {
      validInput = false
    } else {
      validInput = true
    }

    if (this.state.message.title !== "") {
      validMessage = false
    } else {
      validMessage = true
    }

    return validInput && validMessage && !isSending
  };


  // ****************************************************************///
  // 送信が完了するのを待つ
  // ****************************************************************///

  startSending = () => {
    this.setState({
      isSending: true
    })
  }

  endSending() {
    this.setState({
      isSending: false
    })
  }

  // ****************************************************************///
  // タグの操作
  // ****************************************************************///


  handleDelete(i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }


  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag)
    if (this.state.tags.length < 5) {
      this.setState({ tags })
    } else {
      const { message } = this.state;
      this.setState({
        message: {
          ...message,
          tag: Validation.formValidate('tag', this.state.tags)
        }
      })
    }
  }

  handleBlur = (tag) => {
    const { message } = this.state;
    this.setState({
      message: {
        ...message,
        tag: ''
      }
    })
  }


  // ****************************************************************///
  // Editorの保存
  // ****************************************************************///


  saveEditor = async () => {
    let savedData = await this.editorInstance.save()
    this.setState({
      savedData: savedData
    })
  }


  // ****************************************************************///
  // render
  // ****************************************************************///


  render() {
    let displayForm
    let test = true
    const { input, message, status } = this.state;
    const { worryUpdate } = this.props.actionMethod || '';
    

    // Formを表示するとき、Detailコンポーネントからstatusがfalse or true
    // if (this.props.displayForm) {
    if (this.props.isResolveFormOpen) {
      displayForm = (
        <form className="form-wrapper">
          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>どうやって解決しましたか</label>
            {message.resolve && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, bottom: 0 }}>{message.resolve}</span>
              )}
          </section>
          <div className="resolvetest">
            {this.props.data_resolve
              ? <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.data_resolve} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
              : <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
            }

            <FormButton
              {...this.props}
              
              savedData={this.state.savedData}
              sendMethod={this.sendMethod}
              
              canSubmit={this.canSubmit}
              startSending={this.startSending}
              endSending={this.endSending}
              />
          </div>
        </form>
      )
    } else {
      // Formを表示するとき、Detailコンポーネントからstatusがfalse or statusが空白
      displayForm = (
        <form className="form-wrapper">

          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>タイトル</label>
            {message.title && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, top: 3 }}>{message.title}</span>
            )}
            {this.state.input.title
              ? <input
                value={input.title}
                type="text"
                name="title"
                onChange={event => this.changeInputText(event)}
                className="input-area" placeholder="悩みのタイトルを入力してください ※50文字以内"></input>
              : <input
                name="title"
                value={input.title}
                onChange={event => this.changeInputText(event)}
                className="input-area" placeholder="悩みのタイトルを入力してください ※50文字以内"></input>
            }
          </section>

          {/* フォームのタグ部分 */}

          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>タグ</label>
            {message.tag && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, bottom: 0 }}>{message.tag}</span>
            )}

            <ReactTags
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              handleDelete={this.handleDelete.bind(this)}
              handleAddition={this.handleAddition.bind(this)}
              handleBlur={this.handleBlur}
              placeholder={"タグを追加してください"}
            />
          </section>

          {/* フォームの悩み入力部分 */}

          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>悩み</label>
            {message.worry && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, bottom: 0 }}>{message.worry}</span>
            )}
            {input.title
              ? <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.data_worry} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />

              : <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.data_resolve} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
            }
          </section>



          {worryUpdate
            ? <FormButton
              {...this.props}


              title={input.title}
              tags={this.state.tags}
              savedData={this.state.savedData}
              sendMethod={this.sendMethod}

              canSubmit={this.canSubmit}
              startSending={this.startSending}
              endSending={this.endSending}
            />
            : <FormButton
              {...this.props}

              title={input.title}
              tags={this.state.tags}
              savedData={this.state.savedData}
              sendMethod={this.sendMethod}

              canSubmit={this.canSubmit}
              startSending={this.startSending}
              endSending={this.endSending}
            />

          }
        </form>
      )
    }


    return (
      <React.Fragment>
        {displayForm}
      </React.Fragment>
    );
  }
}

export default Form;