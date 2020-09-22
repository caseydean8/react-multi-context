import React from 'react';

const languageContext = React.createContext({
  languages: [],
  languageIndex: 0
});

// console.log(languageContext);

export default languageContext;