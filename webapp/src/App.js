import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          head menu
        </header>
        <main className="mdl-layout__content" style={{flex: '1 0 auto'}}>
          main
        </main>
        <div style={{padding: '0 10px'}}>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="sample1" />
            <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
          </div>
          <button className="mdl-button mdl-js-button" style={{margin: '0 10px'}} onClick={this.sendTextMessage}>Send</button>
        </div>
      </div>
    );
  }
  sendTextMessage() {
    console.log('TEST!!!');
  }
}

export default App;
