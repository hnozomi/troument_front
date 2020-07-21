import React from 'react';
import Display from './Display';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_lists: [],
      todolists: this.props.todolists,
      search: '',
      isSearch: true
    }
    this.searchResult = this.searchResult.bind(this)
  }

  // ****************************************************************///
  // 文字が入力されるたびにsearchDisplayを実行する 
  // ****************************************************************///

  searchResult(e) {
    const value = e.target.value;
    this.setState({
      search: value
    }, () => {
      this.searchDisplay(this.state.search)
    })
  }

  // ****************************************************************///
  // 入力された文字でフィルターをかける
  // ****************************************************************///


  searchDisplay(search) {
    if (search !== '') {
      const filterList =
        this.props.todolists &&
        this.props.todolists.filter((item) => {
          return (
            (item.title && item.title.toString().indexOf(search) !== -1) ||
            (item.worry && item.worry.toString().indexOf(search) !== -1)
          )
        }
        )
      this.setState({
        search_lists: filterList,
      }
      )
    }
  }

  // ****************************************************************///
  // 検索欄に文字が入力されているかで表示を切り替える
  // ****************************************************************///

  render() {
    let search_diaplay
    if (this.state.search === '') {
      search_diaplay = (
        <div className="search-wrapper">
          <img className="search-image" src="/icon/Search_unDraw.svg" alt="Search" />
          <div className="serach-text-wrapper">
            <p className="search-text">同じ悩みを抱えている人がいるかもしれません</p>
            <p className="search-text">検索してみましょう！</p>
          </div>

        </div>
      )
    } else {
      search_diaplay = (
        <div className="display-title-wrapper">
          <Display
            todolists={this.state.search_lists}
            handleDetail={this.props.handleDetail}
            createTime={this.props.createTime}
            isSearch={this.state.isSearch}
          />
        </div>
      )
    }

    return (
      <div>
        <div className="search-form-wrapper">
          <form className="search-form">
            <input value={this.state.search} className="search-input input-area" onChange={e => this.searchResult(e)} placeholder="検索"></input>
          </form>
        </div>
        {search_diaplay}
      </div>
    );
  }
}

export default Search;