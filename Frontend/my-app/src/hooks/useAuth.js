// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return { state, dispatch };
};

export default useAuth;
