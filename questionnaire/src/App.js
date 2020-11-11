import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./Components/Home/Home"
import Questionnaire from "./Components/Questionnaire/Questionnaire"
import Standings from "./Components/Standings/Standings"
import DetailResult from "./Components/DetailResult/DetailResult"
import {getQuestionnaires} from "./Client/QuestionnaireClient"
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      questionnaire: null
    }
    this.setUser = this.setUser.bind(this)
    this.setQuestionnaire = this.setQuestionnaire.bind(this)
  }

  componentDidMount() {
    this.setQuestionnaire()
  }

  setQuestionnaire() {
    getQuestionnaires().then(res => {
      this.setState({
        questionnaire: res.data,
      });
    });
  }

  setUser(user) {
    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/detail/:id" render={() => <DetailResult/>} />

            <Route path="/standings" render={() => <Standings
              questionnaire={this.state.questionnaire}/>} />
            
            <Route path="/questionnaire" render={() => <Questionnaire 
              user={this.state.user} 
              questionnaire={this.state.questionnaire}
              setQuestionnaire={this.state.setQuestionnaire} />} />
            
            <Route exact path="/" render={() => <Home 
              setUser={this.setUser} />} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App