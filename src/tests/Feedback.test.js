import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';

import App from '../App';

const INITIAL_STATE = {
  player: {
  name: 'teste',
  assertions: 1,
  score: 50,
  gravatarEmail: '205e460b479e2e5b48aec07710c08d50?f=y',
}};

const INITIAL_STATE_2 = {
  player: {
  name: 'teste2',
  assertions: 5,
  score: 350,
  gravatarEmail: '205e460b479e2e5b48aec07710c08d50?f=y',
}};

describe('Feedback testing', () => {
test('1', () => {
renderWithRouterAndRedux( <Feedback /> );
const scoreInput = screen.getByTestId('feedback-total-score');
const totalInput = screen.getByTestId('feedback-total-question');
const assertionTextInput = screen.getByTestId('feedback-text');
const buttonPlayInput = screen.getByTestId('btn-play-again');
const buttonRankingInput = screen.getByTestId('btn-ranking');
expect(scoreInput).toBeInTheDocument();
expect(totalInput).toBeInTheDocument();
expect(assertionTextInput).toBeInTheDocument();
expect(buttonPlayInput).toBeInTheDocument();
expect(buttonRankingInput).toBeInTheDocument();
});

test('2', () => {
const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
const buttonPlayInput = screen.getByTestId('btn-play-again');
const assertionTextInput = screen.getByTestId('feedback-text');
const assertionAssertionInput = screen.getByTestId('feedback-total-question');
expect(assertionAssertionInput).toHaveTextContent('1');
expect(assertionTextInput).toHaveTextContent('Could be better...');
expect(buttonPlayInput).toBeInTheDocument();
userEvent.click(buttonPlayInput);
expect(history.location.pathname).toBe('/');
});

test('2.5', () => {
const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE_2, '/feedback');
const buttonPlayInput = screen.getByTestId('btn-play-again');
const assertionTextInput = screen.getByTestId('feedback-text');
expect(assertionTextInput).toHaveTextContent('Well Done!');
expect(buttonPlayInput).toBeInTheDocument();
userEvent.click(buttonPlayInput);
expect(history.location.pathname).toBe('/');
});

// test('3', () => {
// const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
// const buttonRankingInput = screen.getByTestId('btn-ranking');
// expect(buttonRankingInput).toBeInTheDocument();
// userEvent.click(buttonRankingInput);
// expect(history.location.pathname).toBe('/ranking');
// });

test('4', () => {
const { history } = renderWithRouterAndRedux(<Feedback />);
expect(history.location.pathname).toBe('/');
});
});
