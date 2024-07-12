import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);
  return { token, setToken };
};

export default useAuth;