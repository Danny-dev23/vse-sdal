// Сохранение токенов в sessionStorage
export const saveTokens = (accessToken, refreshToken) => {
  sessionStorage.setItem('access_token', accessToken);
  sessionStorage.setItem('refresh_token', refreshToken);
};

// Получение access токена
export const getAccessToken = () => {
  return sessionStorage.getItem('access_token');
};

// Получение refresh токена
export const getRefreshToken = () => {
  return sessionStorage.getItem('refresh_token');
};

// Удаление токенов
export const removeTokens = () => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
};
