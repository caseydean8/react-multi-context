import React from "react";
import UserContext from "../../utils/userContext";

function CardImg() {
  return (
    <UserContext.Consumer>
      {({userObject}) => (
        <div>
          <img className="card-img" src={userObject.image} alt="user thumbnail" />
          {!userObject.image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default CardImg;