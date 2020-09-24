import React from "react";
import CardBtn from "../CardBtn";
import "./style.css";
import languageContext from "../../utils/languageContext";

function LanguageSelector() {
  return (
    <languageContext.Consumer>
      {(context) => (
        // {console.log(languages);}
        <div>
          <h3 className="text-center">Select the user language below:</h3>
          <div className="language-btn">
            <CardBtn style={{ opacity: true ? 1 : 0 }} data-value="lang back" />
            <span className="text-center">
              {context.languages[context.languageIndex]}
            </span>
            <CardBtn style={{ opacity: true ? 1 : 0 }} data-value="lang next" />
          </div>
        </div>
      )}
    </languageContext.Consumer>
  );
}

export default LanguageSelector;
