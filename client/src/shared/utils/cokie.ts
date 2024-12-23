const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const isLoggedIn = (): boolean => {
  const sessionToken = getCookie('SESSION_TOKEN');
  return !!sessionToken;
};
