import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./Components/Home/Home"
import Questionnaire from "./Components/Questionnaire/Questionnaire"
import {getQuestionnaire} from "./Client/QuestionnaireClient"
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      questionnaire: null
    }
    this.setUsername = this.setUsername.bind(this)
    this.setQuestionnaire = this.setQuestionnaire.bind(this)
  }

  componentDidMount() {
    this.setQuestionnaire()
  }

  setQuestionnaire() {
    getQuestionnaire().then(res => {
      this.setState({
        questionnaire: res.data,
      });
    });
  }

  setUsername(username) {
    console.log("AM" + username)
    this.setState({
      username: username,
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/questionnaire" render={() => <Questionnaire 
              username={this.state.username} 
              questionnaire={this.state.questionnaire}
              setQuestionnaire={this.state.setQuestionnaire} />} />
            <Route exact path="/" render={() => <Home setUsername={this.setUsername} />} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App