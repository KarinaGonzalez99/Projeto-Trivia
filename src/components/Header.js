import React, { Component } from 'react';
import './Header.css';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}
export default Header;
