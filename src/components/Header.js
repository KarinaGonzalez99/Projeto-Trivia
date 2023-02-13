import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
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
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { player } = state;
  const { name, gravatarEmail, score } = player;
  console.log(player);
  return { name, gravatarEmail, score };
};
// ({
  // name: state.player.name,
  // gravatarEmail: state.player.gravatarEmail,
  // score: state.player.score,
// });

export default connect(mapStateToProps)(Header);
