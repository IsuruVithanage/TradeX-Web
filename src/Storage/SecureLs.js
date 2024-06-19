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
  ls.set("user", JSON.parse(JSON.stringify(user))); // Serialize user data as JSON string
};

const getUser = () => {
  try {
    const userData = ls.get("user");
    console.log("userData", userData);
    return userData ? JSON.parse(userData) : null; // Parse the JSON string back to an object
  } catch (error) {
    console.error("Error parsing user data from SecureLS:", error);
    return null;
  }
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
