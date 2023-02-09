import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Verifica presença de todos os elementos e funcionalidades da página de Login', () => {
  // beforeEach(() => {const { history } = renderWithRouterAndRedux(<Login />)});

  it('Verifica renderização de campos de input Nome, Email e Botão "Play" e "Configurações', () => {  
    const { history } = renderWithRouterAndRedux(<Login />)

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
    expect(pathname).toBe('/settings');
});

  it('Verifica se o botão fica habilitado quando digita nome e email', () => {
    const { history } = renderWithRouterAndRedux(<Login />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonInput = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'teste');
    expect(buttonInput).toBeDisabled();
    userEvent.type(emailInput, 'teste@teste.com');
    expect(buttonInput).not.toBeDisabled();
    userEvent.click(buttonInput);
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});
