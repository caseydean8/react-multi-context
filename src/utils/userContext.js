import React from "react";

const UserContext = React.createContext({
  languages: [],
  users: [],
  userIndex: 0,
  // firstname: "",
  // lastname: "",
  // email: "",
  // language: "",
  // image: "",
  capitalizeFirstLetter: () => {},
  handleBtnClick: () => {},
  languageObject: [],
  userObject: {}
});

export default UserContext;
