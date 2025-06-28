import { useEffect } from 'react';
import { getAccessToken } from './utils/auth';
import { refreshTokens } from './services/tokenService';

// Проверка токенов при загрузке страницы
const AuthCheck = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        window.location.href = '/custom/2rbina';
      } else {
        const decodedToken = decodeJWT(accessToken);

        if (isTokenExpired(decodedToken)) {
          await refreshTokens();
        }
      }
    };

    checkAuth();
  }, []);

  // Функция для декодирования JWT токена
  const decodeJWT = (token) => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  };

  // Функция для проверки истечения срока действия токена
  const isTokenExpired = (decodedToken) => {
    const currentTime = Math.floor(Date.now() / 1000); // Время в секундах
    return decodedToken.exp < currentTime;
  };

  return null;
};

export default AuthCheck;
