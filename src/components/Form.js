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
        savedData: ''
      },
      isSending: false,
      tags: tag || [],
      savedData: worry,
      status: status,
      suggestions,
    }
    this.changeInputText = this.changeInputText.bind(this)
    this.saveEditor = this.saveEditor.bind(this)
    this.canSubmit = this.canSubmit.bind(this)
    this.startSending = this.startSending.bind(this)
    this.endSending = this.endSending.bind(this)
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
    let validInput;
    let validMessage;
    let validSavedDataInput
    let validSavedDataMessage
    let validTagsInput
    let validTagsMessage
    const { isSending } = this.state;


    // 
    // タイトルが入力されているか確認
    // 
    
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

    // 
    // タグが入力されているか確認
    // 

    if (this.state.tags.length === 0) {
      validTagsInput = false
    } else {
      validTagsInput = true
    }

    if (this.state.message.tag !== "") {
      validTagsMessage = false
    } else {
      validTagsMessage = true
    }
    
    // 
    // 悩みが入力されているか確認
    // 

    if (this.state.savedData === '' || this.state.savedData.blocks.length === 0) {
      validSavedDataInput = false
    } else {
      validSavedDataInput = true
    }

    if (this.state.message.savedData !== "") {
      validSavedDataMessage = false
    } else {
      validSavedDataMessage = true
    }

    return validInput && validMessage && 
           validSavedDataInput && validSavedDataMessage &&
           validTagsInput && validTagsMessage &&
           !isSending
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
    const { message } = this.state;
    tags.splice(i, 1)
    this.setState({
      message: {
        ...message,
        tag: Validation.formValidate('tags', tags)
      },
      tags: tags
    })
  }


  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag)
    const { message } = this.state;
    this.setState({
      message: {
        ...message,
        tag: Validation.formValidate('tags', tags)
      },
      tags: tags
    })
  }

  handleBlur = () => {
    const { message } = this.state;
    this.setState({
      message: {
        ...message,
        tag: Validation.formValidate('tags', this.state.tags)
      },
    })
  }

  handleBlurTitle = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const { message } = this.state;
    this.setState({
      message: {
        ...message,
        [key]: Validation.formValidate(key, value)
      },
    })
  }


  // ****************************************************************///
  // Editorの保存
  // ****************************************************************///


  saveEditor = async () => {
    const { message } = this.state;
    let savedData = await this.editorInstance.save()
    this.setState({
      message: {
        ...message,
        savedData: Validation.formValidate('savedData', savedData)
      },
      savedData: savedData
    })

  }


  // ****************************************************************///
  // render
  // ****************************************************************///


  render() {
    let displayForm
    const { input, message, status } = this.state;

    if (status || this.props.isResolveFormOpen) {
      displayForm = (
        <form className="form-wrapper">
          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>どうやって解決しましたか</label>
            {message.savedData && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, top: 3 }}>{message.savedData}</span>
            )}
          </section>
          <div className="resolvetest">
            {this.props.detail_todolist
              ? <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.detail_todolist.resolve} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
              // ? <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.data_resolve} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
              : <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
            }

            <FormButton
              {...this.props}
              isFormOpen={this.props.isFormOpen}
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
                onBlur={this.handleBlurTitle}
                className="input-area" placeholder="悩みのタイトルを入力してください ※50文字以内"></input>
              : <input
                name="title"
                value={input.title}
                onBlur={this.handleBlurTitle}
                onChange={event => this.changeInputText(event)}
                className="input-area" placeholder="悩みのタイトルを入力してください ※50文字以内"></input>
            }
          </section>

          {/* フォームのタグ部分 */}

          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>タグ</label>
            {message.tag && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, top: 3 }}>{message.tag}</span>
            )}

            <ReactTags
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              handleDelete={this.handleDelete.bind(this)}
              // handleAddition={this.handleAddition.bind(this)}
              onAddition={this.handleAddition.bind(this)}
              handleBlur={this.handleBlur}
              placeholderText={"タグを追加してください"}
            />
          </section>

          {/* フォームの悩み入力部分 */}

          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>悩み</label>
            {message.savedData && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, top: 3 }}>{message.savedData}</span>
            )}
            {/* {input.title */}
            {this.props.detail_todolist
              ? <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.detail_todolist.worry} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
              : <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
              // : <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.detail_todolist.resolve} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
            }
          </section>

          <FormButton
            {...this.props}


            title={input.title}
            tags={this.state.tags}
            savedData={this.state.savedData}
            sendMethod={this.sendMethod}

            canSubmit={this.canSubmit}
            startSending={this.startSending}
            endSending={this.endSending}
          />
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