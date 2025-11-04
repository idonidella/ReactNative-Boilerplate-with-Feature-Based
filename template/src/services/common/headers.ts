//Example header function
function getAuthorizationHeader() {
  const token = "ADD USER TOKEN HERE";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default getAuthorizationHeader;
