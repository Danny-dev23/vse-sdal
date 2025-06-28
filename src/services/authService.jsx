import { saveTokens } from '../utils/auth';

export const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { access_token, refresh_token } = data;
      saveTokens(access_token, refresh_token);
      return true;
    } else {
      throw new Error('Ошибка входа');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
