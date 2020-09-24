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
        languages: [],
        languageIndex: 0,
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
          languageIndex: 0,
        },
      });
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
    });
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

  nextLang(langIndex) {
    if (langIndex >= this.state.languageObject.languages.length) langIndex = 0;
    this.setState({
      languageObject: {
        languages: this.state.languageObject.languages,
        languageIndex: langIndex,
      },
    });
    this.loadUsers(this.state.languageObject.languages[langIndex]);
  }

  prevLang(langIndex) {
    if (langIndex < 0) {
      langIndex = this.state.languageObject.languages.length - 1;
    }
    this.setState({
      languageObject: {
        languages: this.state.languageObject.languages,
        languageIndex: langIndex,
      },
    });
    this.loadUsers(this.state.languageObject.languages[langIndex]);
  }

  handleUserBtnClick = (event) => {
    // Get the title of the clicked button
    const btnName = event.target.getAttribute("data-value");
    let userIndex, langIndex;
    switch (btnName) {
      case "next":
        userIndex = this.state.userIndex + 1;
        this.nextUser(userIndex);
        break;
      case "lang next":
        langIndex = this.state.languageObject.languageIndex + 1;
        this.nextLang(langIndex);
        break;
      case "lang back":
        langIndex = this.state.languageObject.languageIndex - 1;
        this.prevLang(langIndex);
        break;
      default:
        userIndex = this.state.userIndex - 1;
        this.previousUser(userIndex);
    }
  };

  loadUsers(language) {
    API.getUsersByLanguage(language)
      .then((users) => {
        return this.setState({
          users: users,
          userObject: users[0],
        });
      })
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
