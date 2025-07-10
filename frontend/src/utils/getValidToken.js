export const getValidToken = (setError, setIsAuthenticated, navigate) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setError("Non Autenticato");
    setIsAuthenticated(false);
    navigate("/login");
    return null;
  }
  return token;
};