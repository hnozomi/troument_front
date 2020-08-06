
function DetailDisplay(props) {
    return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
    );

    if (props.status) {
        createDetail = (
            <React.Fragment>
    
                <div className="detail-wrapper">
                    <section className="detail-section">
                        <div className="detail-area">
                            <h1 className="detail-header">
                                悩みの詳細
                                </h1>
                            <EditorJs holder="worry" data={this.props.data_worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                <div id="worry" />
                            </EditorJs>
                        </div>
                        <h1 className="detail-header">
                            解決詳細
                                </h1>
                        <div className="detail-area">
                            <EditorJs holder="resolve" data={this.propsdata_resolve} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                                <div id="resolve" />
                            </EditorJs>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    } else {
    
        createDetail = (
            <React.Fragment>
                <div className="detail-wrapper">
                    <section className="detail-section">
                        <h1 className="detail-section">
                            悩み中
                                </h1>
                    </section>
                    <div className="detail-area">
                        <EditorJs holder="custom" data={this.props.data_worry} enableReInitialize={true} instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS}>
                            <div id="custom" />
                        </EditorJs>
                    </div>
                    <FormButton
                        ClickDisplayForm={this.props.actionMethod.ClickDisplayForm}
                        isStatus={status}
                        detail_todolist={this.props.detail_todolist}
                        login_user={login_user}
                    />
                </div>
            </React.Fragment>
        )
    }
















  }

