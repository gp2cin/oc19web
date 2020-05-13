import api from '../services/api';

export const TOKEN_KEY = '@oc19-Token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const isAuthenticatedObserver = async () => {
  if (localStorage.getItem(TOKEN_KEY) !== null) {
    api.get('api/v1/me')
      .then(response => {
        if (response != null && response != undefined) {
          console.log(response.data.role.name);
          if (response.data.role.name == 'OBSERVER') {
            return true;
          }
          return false;
        }
        return false;
      })
  }
  return false;
}