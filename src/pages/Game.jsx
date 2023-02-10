import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import getQuestion from '../services/getTokenAPI';

class Game extends Component {
  state = {
    questions: [],
    answers: [],
    questionIndex: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log(data.results);
    const invalidTokenCode = 3;
    if (data.response_code === invalidTokenCode) {
      console.log('invalido');
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: data.results }, this.storeAnswers);
    }
  }

  storeAnswers = () => {
    const { questions, questionIndex } = this.state;

    const answers = [...questions[questionIndex].incorrect_answers,
      questions[questionIndex].correct_answer];
    const shuffledAnswers = this.shuffle(answers);
    this.setState({ answers: shuffledAnswers });

    // for (let index = 0; index < questions.length; index += 1) {
    //   console.log(questions[index]);
    //   this.setState({
    //     answers: [
    //       ...answers,
    //       [...questions[index].incorrect_answers, questions[index].correct_answer],
    //       // questions[index].incorrect_answers.concat(questions[index].correct_answer),
    //     ],
    //   });
    // }
  };

  // referencia: https://bost.ocks.org/mike/shuffle/
  shuffle = (array) => {
    let m = array.length;
    let t;
    let i;

    // While there remain elements to shuffle…
    while (m !== 0) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m);
      m -= 1;

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };

  isCorrect = (answer) => {
    const { questions, questionIndex } = this.state;
    if (answer === questions[questionIndex].correct_answer) {
      return 'correct-answer';
    }
    const index = questions[questionIndex].incorrect_answers
      .findIndex((answers) => answers === answer);
    return `wrong-answer-${index}`;
  };

  render() {
    const { questions, questionIndex, answers } = this.state;
    if (questions.length === 0) return <p>loading...</p>;
    return (
      <div>
        <Header />
        <h1>Game</h1>
        <p data-testid="question-category">
          { questions[questionIndex].category }
        </p>
        <p data-testid="question-text">
          { questions[questionIndex].question }
        </p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              data-testid={ this.isCorrect(answer) }
              key={ index }
            >
              { answer }
            </button>))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  // questionIndex: PropTypes.number.isRequired,
  // questions: PropTypes.arrayOf.isRequired,
};

export default connect()(Game);
