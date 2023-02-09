import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { user: { name, gravatarEmail, score } } = this.props;
    // console.log(email);
    const emailGravatar = md5(gravatarEmail).toString();
    // console.log(emailGravatar);
    return (
      <div>
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <main>
          <img
            src={ `https://www.gravatar.com/avatar/${emailGravatar}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </main>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.player,
});

export default connect(mapStateToProps)(Header);
