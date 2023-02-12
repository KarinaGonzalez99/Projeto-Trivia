import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { user: { assertions, score }, history } = this.props;
    const MIN_ASSERTION = 3;
    return (
      <div>
        <Header />
        <div>
          <p>Pontuação Final</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <div>
          <p>Total de acertos</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </div>
        <div>
          { assertions < MIN_ASSERTION
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p> }
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  user: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.player,
});

export default connect(mapStateToProps)(Feedback);
