import { api } from '.';

class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = localStorage.getItem('loggedIn') === 'true';
  }

  private handleAuth = (loggedInValue: boolean) => {
    this.authenticated = loggedInValue;
    localStorage.setItem('loggedIn', String(loggedInValue));
  };

  async login(email: string, password: string) {
    try {
      const response = await api.token.tokenObtainCreate({
        email,
        password,
      });
      this.handleAuth(true);
      return response;
    } catch (error) {
      this.handleAuth(false);
    }
  }

  async logout() {
    const response = await api.token.tokenLogoutRetrieve();
    if (response.ok) {
      this.handleAuth(false);
      if (!window.location.pathname.includes('login')) {
        window.location.href = 'login';
      }
    }
    return response;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export const auth = new Auth();
