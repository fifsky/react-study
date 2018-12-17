export const getAccessToken = function () {
  return localStorage.getItem('access_token')
}

export function setAccessToken(token) {
  return localStorage.setItem('access_token', token);
}