import React from 'react';

class Notify extends React.Component{
    render()
    {
      return (
        <div className="notify-wrapper">
          <div className="notify">
            <img alt="Notify" className="notify-icon" src="/icon/moyamoya.svg" />
            <p className="notify-text">悩みタイトル</p>
          </div>
          <p className="notify-contect">○○さんがあなたと同じ悩みを持っています</p>
        </div>
      );
    }
  }
  
  export default Notify;