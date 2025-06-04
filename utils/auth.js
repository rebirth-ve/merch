import { adminUsers } from '../mock/users';
import { setStorageItem, removeStorageItem, getStorageItem } from './storage';

export const login = (username, password) => {
  const user = adminUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // Almacenar una copia del usuario para evitar modificar el objeto original de adminUsers
    setStorageItem('currentUser', { ...user });
    return true;
  }
  return false;
};

export const logout = () => {
  removeStorageItem('currentUser');
};

export const getCurrentUser = () => {
  return getStorageItem('currentUser');
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'CEO';
};

export const isMarketing = () => {
  const user = getCurrentUser();
  return user && user.role === 'Marketing';
};

export const isInventoryManager = () => {
  const user = getCurrentUser();
  return user && user.role === 'Inventory';
};