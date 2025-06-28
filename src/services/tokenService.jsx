export const refreshToken = async () => {
  const refresh_token = sessionStorage.getItem("refresh_token");
  if (!refresh_token) {
    throw new Error("Refresh token not found");
  }

  const response = await fetch("http://147.45.146.242/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refresh_token }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  sessionStorage.setItem("access_token", data.access);
  return data.access;
};
