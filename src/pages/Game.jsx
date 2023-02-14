import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import Header from '../components/Header';
import './Game.css';
import { score, assertions } from '../redux/actions';
// import getQuestion from '../services/getTokenAPI';

class Game extends Component {
  state = {
    questions: [],
    answers: [],
    questionIndex: 0,
    isClicked: false,
    counterTimer: 30,
    isDisabled: false,
    nextDisable: true,
    playerScore: 0,
    playerAssertions: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const invalidTokenCode = 3;
    if (data.response_code === invalidTokenCode) {
      console.log('invalido');
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: data.results }, this.storeAnswers);
    }

    const interval = 1000;
    this.intervalID = setInterval(() => this.timer(), interval);
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

  handleNext = () => {
    const { history } = this.props;
    const { questionIndex } = this.state;
    const MAX_QUESTIONS = 4;
    if (questionIndex < MAX_QUESTIONS) {
      this.setState({
        isClicked: false,
        counterTimer: 30,
        isDisabled: false,
      });
      const interval = 1000;
      this.intervalID = setInterval(() => this.timer(), interval);
      this.setState((prevState) => (
        { questionIndex: prevState.questionIndex + 1 }), this.storeAnswers);
    } else {
      history.push('/feedback');
    }
  };

  scoreSum = (answer) => {
    const { counterTimer, questions, questionIndex } = this.state;
    const { dispatch } = this.props;
    const basePoint = 10;
    let finalScore = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const questionDifficulty = questions[questionIndex].difficulty;
    let dificuldade = '';
    if (questionDifficulty === 'easy') {
      dificuldade = easy;
    } else if (questionDifficulty === 'medium') {
      dificuldade = medium;
    } else dificuldade = hard;
    if (answer === questions[questionIndex].correct_answer) {
      finalScore = basePoint + (dificuldade * counterTimer);
      this.setState((prevState) => ({
        playerScore: prevState.playerScore + finalScore,
        playerAssertions: prevState.playerAssertions + 1,
      }), () => {
        const { playerScore, playerAssertions } = this.state;
        dispatch(score(playerScore));
        dispatch(assertions(playerAssertions));
      });
    }
  };

  handleColor = (answer) => {
    this.setState({
      isClicked: true,
      nextDisable: false,
    });
    clearInterval(this.intervalID);
    this.scoreSum(answer);
  };

  timer = () => {
    const { counterTimer } = this.state;
    const ZERO = 0;
    let intervalID;
    if (counterTimer > ZERO) {
      this.setState({ counterTimer: counterTimer - 1 });
    } else {
      this.setState({
        isDisabled: true,
        nextDisable: false,
      });
      clearInterval(intervalID);
    }
  };

  render() {
    const { questions, questionIndex,
      answers, isClicked, counterTimer, isDisabled, nextDisable } = this.state;
    if (questions.length === 0) return <p>loading...</p>;
    const clean = sanitizeHtml(questions[questionIndex].question);
    return (
      <div>
        <Header />
        <h1>Game</h1>
        <p>{ counterTimer }</p>
        <p data-testid="question-category">
          { questions[questionIndex].category }
        </p>
        <p
          data-testid="question-text"
        >
          { clean }
          {/* { questions[questionIndex].question } */}
        </p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => {
            const cleanAnswer = sanitizeHtml(answer);

            return (
              <button
                data-testid={ this.isCorrect(answer) }
                key={ index }
                onClick={ () => this.handleColor(answer) }
                className={ isClicked ? this.isCorrect(answer) : 'none' }
                disabled={ isDisabled }
              >
                { cleanAnswer }
              </button>
            );
          })}
        </div>
        {
          nextDisable
            ? null
            : (
              <button
                type="button"
                onClick={ this.handleNext }
                data-testid="btn-next"
              >
                Next
              </button>
            )
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
