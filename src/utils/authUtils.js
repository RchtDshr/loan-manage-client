import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem('token');
  const userRole = JSON.parse(atob(token.split('.')[1])).role;

  if (userRole === 'admin'){
    return true;
  } else { return false }
}
