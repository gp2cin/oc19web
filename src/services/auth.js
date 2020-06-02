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
  console.log('AQUI0');
  if (localStorage.getItem(TOKEN_KEY) !== null) {
    console.log('AQUI1');
    const response = await api.get('api/v1/me')
    console.log('AQUI2');
    if (response !== null && response !== undefined) {
      console.log('AQUI3');
      console.log(response.data.role.name);
      if (response.data.role.name === 'OBSERVER') {
        console.log('AQUI4');
        return true;
      }
      return false;
    }
    return false;
  } else {
    console.log('AQUI5');
    return false;
  }
}

export const userInfo = async () => {
  if (isAuthenticated()) {
    const response = await api.get('api/v1/me');
    return response.data
  }
}

