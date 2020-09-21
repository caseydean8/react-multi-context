import React from "react";
import UserContext from "../../utils/userContext";

function CardTitleText() {
  return (
    <UserContext.Consumer>
      {/* console.log('card title text'); */}
      {(context) => (
        // console.log(context)
        <h2>
          {context.capitalizeFirstLetter(context.userObject.firstname) +
            " " +
            context.capitalizeFirstLetter(context.userObject.lastname)}
        </h2>
      )}
    </UserContext.Consumer>
  );
}

export default CardTitleText;
