import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';

const INITIAL_STATE = {
     player: {
     name: 'teste',
     assertions: 1,
     score: 245,
     gravatarEmail: '205e460b479e2e5b48aec07710c08d50?f=y',
   }};

describe('', () => {
     test('1', () => {
          const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/feedback');
          localStorage.setItem('ranking', JSON.stringify([{ name: 'teste', score: 245, picture:'' }]));
          
          const buttonRankingInput = screen.getByTestId('btn-ranking');
          expect(buttonRankingInput).toBeInTheDocument();
          userEvent.click(buttonRankingInput);
          expect(history.location.pathname).toBe('/ranking');

          const rankInput = screen.getByTestId('ranking-title');
          const buttonHomeInput = screen.getByTestId('btn-go-home');
          expect(rankInput).toBeInTheDocument();
          expect(buttonHomeInput).toBeInTheDocument();
     });

     test('2', () => {
          const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/feedback');
          localStorage.setItem('ranking', JSON.stringify([{ name: 'teste', score: 245, picture:'' }]));
          
          const buttonRankingInput = screen.getByTestId('btn-ranking');
          expect(buttonRankingInput).toBeInTheDocument();
          userEvent.click(buttonRankingInput);
          expect(history.location.pathname).toBe('/ranking');

          const rankInput = screen.getByTestId('ranking-title');
          const buttonHomeInput = screen.getByTestId('btn-go-home');
          expect(rankInput).toBeInTheDocument();
          expect(rankInput).toHaveTextContent(/Ranking/i);
          expect(buttonHomeInput).toBeInTheDocument();
          expect(buttonHomeInput).toHaveTextContent(/Home/i);
     });

     test('3', () => {
          const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/feedback');
          localStorage.setItem('ranking', JSON.stringify([{ name: 'teste', score: 245, picture:'' }]));
          
          const buttonRankingInput = screen.getByTestId('btn-ranking');
          expect(buttonRankingInput).toBeInTheDocument();
          userEvent.click(buttonRankingInput);
          expect(history.location.pathname).toBe('/ranking');

          const buttonHomeInput = screen.getByTestId('btn-go-home');
          expect(buttonHomeInput).toBeInTheDocument();
          userEvent.click(buttonHomeInput);
          expect(history.location.pathname).toBe('/');
     });

     test('4', () => {
          const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/feedback');
          localStorage.setItem('ranking', JSON.stringify([
               {name: 'teste1', score: 245, picture:'' },
               {name: 'teste2', score: 300, picture:'' },
          ]));
          
          const buttonRankingInput = screen.getByTestId('btn-ranking');
          expect(buttonRankingInput).toBeInTheDocument();
          userEvent.click(buttonRankingInput);
          expect(history.location.pathname).toBe('/ranking');
          
          const score = screen.getByText('245');
          expect(score).toBeInTheDocument();
          expect(score).toHaveTextContent('245');

          const player1 = screen.getAllByText(/teste1/i);
          expect(player1[0]).toHaveTextContent('teste1');
          const player2 = screen.getAllByText(/teste2/i);
          expect(player2[0]).toHaveTextContent('teste2');
 });
 
})