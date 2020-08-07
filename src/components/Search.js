import React from 'react';
import Display from './Display';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLists: [],
      todolists: this.props.todolists,
      searchWord: '',
      isSearch: true
    }
    this.filterSearchWord = this.filterSearchWord.bind(this)
  }

  // ****************************************************************///
  // 文字が入力されるたびにsearchDisplayを実行する 
  // ****************************************************************///

  filterSearchWord(e) {
    const value = e.target.value;
    this.setState({
      searchWord: value
    }, () => {
      this.searchDisplay(this.state.searchWord)
    })
  }

  // ****************************************************************///
  // 検索結果を表示する
  // ****************************************************************///


  searchDisplay(searchWord) {

    if (searchWord !== '') {
      const filterList =
        this.props.todolists &&
        this.props.todolists.filter((todolist) => {
          return (
            (todolist.title && todolist.title.toString().toLowerCase().indexOf(searchWord.toLowerCase()) !== -1)
            // (todolist.tag[0].name && todolist.tag[0].name.toString().toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) ||
            // (todolist.worry.blocks[0].data.text && todolist.worry.blocks[0].data.text.toString().toLowerCase().indexOf(searchWord.toLowerCase()) !== -1)
          )
        }
        )

      this.setState({
        searchLists: filterList,
      }
      )

    }
  }

  // ****************************************************************///
  // 検索欄に文字が入力されているかで表示を切り替える
  // ****************************************************************///

  render() {
    let searchResult;

    if (this.state.searchWord === '') {
      searchResult = (
        <div className="search-wrapper">
          <img className="search-image" src="/icon/Search_unDraw.svg" alt="Search" />
          <div className="search-text-wrapper">
            <p className="search-text">同じ悩みを抱えている人がいるかもしれません</p>
            <p className="search-text">検索してみましょう！</p>
          </div>

        </div>
      )
    } else {
      searchResult = (
        <div className="display-title-wrapper">
          <Display
            actionMethod={this.props.actionMethod}
            todolists={this.state.searchLists}
            isSearch={this.state.isSearch}
          />
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className="search-form-wrapper">
          <form className="search-form">
            <input value={this.state.searchWord} className="search-input input-area" onChange={e => this.filterSearchWord(e)} placeholder="検索"></input>
          </form>
        </div>
        {searchResult}
      </React.Fragment>
    );

  }
}

export default Search;