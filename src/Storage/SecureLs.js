import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes" });

const setAccessToken = (token) => {
  ls.set("accessToken", token);
};

const getAccessToken = () => {
  return ls.get("accessToken");
};

const removeAccessToken = () => {
  ls.remove("accessToken");
};

const setUser = (user) => {
  console.log("userLS", JSON.parse(JSON.stringify(user)));
  ls.set("user", JSON.parse(JSON.stringify(user)));
};

const getUser = () => {
  const userData = ls.get("user");
  console.log("userData", userData);
  return userData ? userData : null;
};

const removeUser = () => {
  ls.remove("user");
};

export {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setUser,
  getUser,
  removeUser,
};
