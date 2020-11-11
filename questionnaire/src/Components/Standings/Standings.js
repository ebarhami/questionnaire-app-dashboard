import React from 'react'
import { withRouter } from "react-router-dom"
import {
  getStandingsFromQuestionnaire
} from '../../Client/QuestionnaireClient';
import "./Standings.scss"

class Standings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionnaireChoosenId: null,
      standings: null
    }
    this.handleChooseBoard = this.handleChooseBoard.bind(this)
    this.getStandings = this.getStandings.bind(this)
    this.renderBoard = this.renderBoard.bind(this)
    this.handleChooseBoard = this.handleChooseBoard.bind(this)
    this.resetPage = this.resetPage.bind(this)
  }

  getStandings(questionnaire) {
    getStandingsFromQuestionnaire(questionnaire)
      .then(async res => {
        await this.setState({
          standings: res.data
        })
      })
      .catch(err => console.log("error" + err));
  }

  resetPage(e) {
    e.preventDefault()
    this.setState({
      questionnaireChoosenId: null,
      standings: null
    })
    
  }

  handleChooseBoard(idx) {
    this.setState({
      questionnaireChoosenId: this.props.questionnaire[idx]._id
    })
  }

  detailResultHandler(e, standingId) {
    e.preventDefault()
    this.props.history.push('/detail/'+ standingId)
  }

  renderBoard() {
    return <div className="container">
      <div className="standing-header">
        <h1>Standings</h1>
        <p>hover to username to see detail answer of a specific user</p>
        <button onClick={e => this.resetPage(e)}>Back to Scoreboard List</button>
      </div>
      <div className="table">
        <div className="table-header">
          <div className="header__item">Rank</div>
          <div className="header__item">Username</div>
          <div className="header__item">Score</div>
        </div>
        <div className="table-content">
          {this.state.standings
          .sort((a, b) => b.score - a.score)
          .map((standing, idx) => {
            return (
              <div key={idx} className="table-row">
                <div className="table-data">{idx + 1}</div>
                <div className="username" onClick={e => this.detailResultHandler(e, standing._id)}>{standing.user}</div>
                <div className="table-data">{standing.score}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  }
  
  render() {
    let comp
    if (this.state.standings) {
      comp = this.renderBoard()
    } else if (this.state.questionnaireChoosenId) {
      this.getStandings(this.state.questionnaireChoosenId)
    } else {
      if (this.props.questionnaire) {
        comp = 
          <div className='standings-list' >
            <h1>
              Choose Scoreboard ...
            </h1>
            {this.props.questionnaire.map((questionnaire, i) => (
              <button key={i} onClick={() => this.handleChooseBoard(i)}>{questionnaire.topic}</button>))}
          </div>
      } else {
        this.props.history.push("/questionnaire")
      }
    }

    return (
      <div className='standings'>
        {comp}
      </div >
    )
  }
}

export default withRouter(Standings)