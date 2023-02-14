import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    sortedRanking: [],
  };

  componentDidMount() {
    this.sortRanking();
  }

  sortRanking = () => {
    const storedRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = storedRanking
      .sort((playerA, playerB) => playerB.score - playerA.score);
    this.setState({ sortedRanking });
  };

  render() {
    const { history } = this.props;
    const { sortedRanking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { sortedRanking.map((ranking, index) => (
          <div key={ index }>
            <img src={ ranking.picture } alt={ ranking.name } />
            <p data-testid={ `player-name-${index}` }>{ ranking.name }</p>
            <p data-testid={ `player-score-${index}` }>{ ranking.score }</p>
          </div>
        )) }
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
