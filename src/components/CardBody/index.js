import React from 'react';
import UserContext from "../../utils/userContext";

function CardBody() {
  return (
    <UserContext.Consumer>
      {({ userObject }) => (
        <div>
          <h4>
          Favorite language: {userObject.language}
          </h4>
          <h4>
          Email: {userObject.email}
          </h4>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default CardBody;
