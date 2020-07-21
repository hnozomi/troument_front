import React from 'react';
import './Toppage.css'

class Toppage extends React.Component {

    render() {
        return (

                <div className="wrappers">

                    <div className="maintitle-wrapper wrapper-margin">
                        <h1 className="maintitle">
                            <p className="maintitle-text">あなたが解決した</p>
                            <p className="maintitle-text">悩みが</p>
                            <p className="maintitle-text">誰かの役に立つ</p>
                        </h1>
                        <img alt="Toppage" className="maintitle-image" src="./image/toppage-main.svg" />
                    </div>

                    <div className="about-troument wrapper-margin">
                        <h2 className="wrapper-title">Troumentとは...</h2>
                        <p className="about-troument-text">エンジニアの人が勉強中に出てきた悩みを解決し</p>
                        <p className="about-troument-text">記録してみんなで共有するアプリです</p>
                        <img alt="Arrow" className="down-arrow-icon" src="./image/down-arrow.svg" />
                    </div>

                    <div className="todo-troument-wrapper wrapper-margin">
                        <h2 className="wrapper-title">Troumentでできること</h2>
                        <div className="todo-troument-content">
                            <p className="todo-troument-number">1</p>
                            <h3 className="todo-troument-head">悩み投稿機能</h3>
                            <p className="todo-troument-text">どうやったら実現できるのだろう？</p>
                            <p className="todo-troument-text">なんでこうなるのだろう？</p>
                            <p className="todo-troument-text">など勉強していて悩んだことをメモ</p>
                            <img alt="Worry" className="todo-troument-image" src="./image/toppage-1.svg" />
                        </div>

                        <div className="todo-troument-content">
                            <p className="todo-troument-number">2</p>
                            <h3 className="todo-troument-head">解決記録機能</h3>
                            <p className="todo-troument-text">わからなかったことが解決！</p>
                            <p className="todo-troument-text">どうやって解決したか記録しておき</p>
                            <p className="todo-troument-text">ナレッジを貯めていこう</p>
                            <img alt="Resolve" className="todo-troument-image" src="./image/toppage-2.svg" />
                        </div>

                        <div className="todo-troument-content">
                            <p className="todo-troument-number">3</p>
                            <h3 className="todo-troument-head">解決通知機能</h3>
                            <p className="todo-troument-text">「あの人の悩みが気になる... 」</p>
                            <p className="todo-troument-text">そんなときは気になるボタンを押しておくと解決したときに通知が来ます！</p>
                            <img alt="Notify" className="todo-troument-image" src="./image/toppage-3.svg" />
                        </div>

                        <div className="todo-troument-content">
                            <p className="todo-troument-number">4</p>
                            <h3 className="todo-troument-head">検索機能</h3>
                            <p className="todo-troument-text">これはどうしたらいいのだろうか... </p>
                            <p className="todo-troument-text">そんなときは過去のナレッジを検索してみよう！</p>
                            <img alt="Search" className="todo-troument-image" src="./image/toppage-4.svg" />
                        </div>
                    </div>

                </div>

        )
    }

}

export default Toppage;