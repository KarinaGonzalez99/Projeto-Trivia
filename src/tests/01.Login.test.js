import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';

describe('Verifica presença de todos os elementos e funcionalidades da página de Login', () => {

  it('Verifica renderização de campos de input Nome, Email e Botão "Play" e "Configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonInput = screen.getByTestId('btn-play');
    const buttonSettings = screen.getByTestId('btn-settings');
    const logo = screen.getByAltText('logo');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();    
    expect(buttonInput).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    const button = screen.getByText('Configurações')
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const { pathname } = history.location;
    console.log(pathname);
    expect(pathname).toBe('/settings');
});

  it('Verifica se o botão fica habilitado quando digita nome e email', async () => {
    const mockFetch = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "addf9f88ef39526c1ab20bf586c6858d190f1a58e1183d90bbf0b94b82a283ab",
    };
    
    global.fetch = jest.fn().mockResolvedValue({
      json: () => jest.fn().mockResolvedValue(mockFetch),
    });
    
    const { history } = renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonInput = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'teste');
    expect(buttonInput).toBeDisabled();
    userEvent.type(emailInput, 'teste@teste.com');
    expect(buttonInput).not.toBeDisabled();
    userEvent.click(buttonInput);
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    });
    
  //   const playerName = screen.getByTestId('header-player-name');
  //   expect(playerName).toBeInTheDocument();
  //   expect(playerName).toHaveTextContent('teste');
  //   const profilePic = screen.getByTestId('header-profile-picture');
  //   expect(profilePic).toBeInTheDocument();
  //   expect(profilePic).toHaveAltText('avatar');
  //   const playerScore = screen.getByTestId('header-score');
  //   expect(playerScore).toBeInTheDocument();
  //   expect(playerScore).toHaveTextContent('0');
  });

  // it('verifica local storage', () => {
    // const { history } = renderWithRouterAndRedux(<App />)

    // act(() => {
    //   localStorage.setItem('testKey', 'testValue');
    // })
    // const stored = localStorage.getItem('testKey');
    // expect(stored).toBe('testValue');

    // const testKey = 'usuario';
    // const testValue = 'Mario';

    // window.localStorage.setItem(testKey, testValue);
    // const stored = localStorage.getItem(testKey);
    // expect(stored).toBe(testValue);
  });
