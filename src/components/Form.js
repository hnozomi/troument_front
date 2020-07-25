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
    const { title, tag, worry } = this.props.detail_todolist

    this.state = {
      clickbutton: false,
      form: true,
      input: {
        title: title || '',
        tag: tag || '',
        worry: worry || '',
        resolve: this.props.resolve,
        // title: this.props.detail_todolist.title || '',
        // tag: this.props.detail_todolist.tag || '',
        // worry: this.props.detail_todolist.worry || '',
        // resolve: this.props.resolve,

      },
      message: {
        title: '',
        tag: '',
        worry: '',
        resolve: '',
      },
      sending: false,
      tags: this.props.detail_todolist.tag || [],
      savedData: this.props.detail_todolist.worry || '',
      suggestions,
    }
    this.handleChange = this.handleChange.bind(this)
    this.canSubmit = this.canSubmit.bind(this)
    this.ChangeFalseLoading = this.ChangeFalseLoading.bind(this)
    this.ChangeTrueLoading = this.ChangeTrueLoading.bind(this)
    
  }

  // ****************************************************************///
  // Formに入力されてる文字を反映
  // ****************************************************************///

  handleChange(event) {
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
    const { sending } = this.state;

    if (this.state.input.title === undefined) {
      validInput = false
    } else {
      validInput = true
    }

    if (this.state.message.title !== "") {
      validMessage = false
    } else {
      validMessage = true
    }

    return validInput && validMessage && !sending
  };


  // ****************************************************************///
  // 送信が完了するのを待つ
  // ****************************************************************///

  ChangeTrueLoading = () => {
    this.setState({
      sending: true
    })
  }

  ChangeFalseLoading() {
    this.setState({
      sending: false
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
    const { input, message } = this.state;
    const { worryUpdate } = this.props.actionMethod || '';

    // const sendMethod = {
    //   canSubmit: this.canSubmit,
    //   ChangeTrueLoading: this.ChangeTrueLoading,
    //   ChangeFalseLoading: this.ChangeFalseLoading,
    // }

    let title = this.state.input.title
    // if (this.props.displayForm) {
    if (this.props.detail_todolist.status) {
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
              ChangeTrueLoading={this.ChangeTrueLoading}
              ChangeFalseLoading={this.ChangeFalseLoading}
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
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, top: 3}}>{message.title}</span>
            )}
            {this.props.detail_todolist.title
              ? <input value={this.state.input.title}
                name="title"
                onChange={event => this.handleChange(event)}
                className="input-area" placeholder="悩みのタイトルを入力してください ※50文字以内"></input>
              : <input
                name="title"
                onChange={event => this.handleChange(event)}
                className="input-area" placeholder="悩みのタイトルを入力してください ※50文字以内"></input>
            }
          </section>

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

          <section className="form-wrapper-sec" style={{ position: 'relative' }}>
            <label>悩み</label>
            {message.worry && (
              <span style={{ color: 'red', fontSize: 8, position: 'absolute', right: 0, bottom: 0 }}>{message.worry}</span>
            )}
          {this.props.detail_todolist.title
            ? <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.data_worry} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
            
            : <EditorJs onChange={this.saveEditor} instanceRef={instance => this.editorInstance = instance} data={this.props.data_resolve} tools={EDITOR_JS_TOOLS} enableReInitialize={false} />
          }
          </section>

          {worryUpdate
            ? <FormButton
              {...this.props}


              title={title}
              tags={this.state.tags}
              savedData={this.state.savedData}
              sendMethod={this.sendMethod}

              canSubmit={this.canSubmit}
              ChangeTrueLoading={this.ChangeTrueLoading}
              ChangeFalseLoading={this.ChangeFalseLoading}
            />
            : <FormButton
              {...this.props}

              title={title}
              tags={this.state.tags}
              savedData={this.state.savedData}
              sendMethod={this.sendMethod}

              canSubmit={this.canSubmit}
              ChangeTrueLoading={this.ChangeTrueLoading}
              ChangeFalseLoading={this.ChangeFalseLoading}
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