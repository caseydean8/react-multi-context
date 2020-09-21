import React, { Component } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import CardContainer from "../components/CardContainer";
import Row from "../components/Row";
import LanguageSelector from "../components/LanguageSelector";
import languageContext from "../utils/languageContext";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // languages: [],
      // user: {},
      users: [],
      userIndex: 0,
      capitalizeFirstLetter: this.capitalizeFirstLetter,
      handleBtnClick: this.handleUserBtnClick,
      languageObject: {
        languages: []
      },
      userObject: {},
    };
  }

  // When the component mounts, the list of languages are fetched.
  // After the languages are retreived we make another call to load users who use the first language in the list.
  componentDidMount() {
    API.getLanguagesList().then((languages) => {
      this.setState({
        languageObject: {
          languages: languages,
        },
      });
      console.log(this.state);
      console.log(this.state.languageObject.languages[1]);
      this.loadUsers(languages[0]);
    });
  }

  capitalizeFirstLetter(string = "") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  nextUser(userIndex) {
    if (userIndex >= this.state.users.length) {
      userIndex = 0;
    }
    this.setState({
      userObject: this.state.users[userIndex],
      userIndex: userIndex,
    })
    // .then(() => console.log(this.state.user));
  }

  previousUser(userIndex) {
    if (userIndex < 0) {
      userIndex = this.state.users.length - 1;
    }
    this.setState({
      userObject: this.state.users[userIndex],
      userIndex: userIndex,
    });
  }

  handleUserBtnClick = (event) => {
    // Get the title of the clicked button
    console.log(this.state.userObject);
    const btnName = event.target.getAttribute("data-value");
    console.log(btnName,  "clicked");
    if (btnName === "next") {
      const userIndex = this.state.userIndex + 1;
      this.nextUser(userIndex);
    } else {
      const userIndex = this.state.userIndex - 1;
      this.previousUser(userIndex);
    }
  };

  loadUsers(language) {
    API.getUsersByLanguage(language)
      .then((users) => {
        console.log(users);
        return this.setState({
          users: users,
          // user: users[0],
          userObject: users[0],
        });
      })
      .then(() => console.log(this.state.userObject))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <div>
          <h1 className="text-center">Welcome to LinkedUp</h1>
          <h3 className="text-center">Click on the arrows to browse users</h3>
          <languageContext.Provider value={this.state.languageObject}>
            <LanguageSelector />
          </languageContext.Provider>
          <Row>
            <CardContainer />
          </Row>
        </div>
      </UserContext.Provider>
    );
  }
}

export default Gallery;
