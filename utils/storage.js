import React, { useState, useEffect } from 'react';

// Función para crear un hook de estado persistente en localStorage
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar nuestro valor
  // Pasa una función al useState para que la lógica de lectura solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parsear JSON si el valor es una cadena JSON, de lo contrario, devolver el valor
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay un error, devuelve el valor inicial
      console.error(error);
      return initialValue;
    }
  });

  // useEffect para actualizar localStorage cuando el estado cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

// Función para obtener un valor de localStorage
export const getStorageItem = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error al obtener de localStorage:", error);
    return null;
  }
};

// Función para establecer un valor en localStorage
export const setStorageItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    return false;
  }
};

// Función para remover un valor de localStorage
export const removeStorageItem = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error al remover de localStorage:", error);
    return false;
  }
};