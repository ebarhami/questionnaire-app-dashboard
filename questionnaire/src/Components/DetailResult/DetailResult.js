import React from 'react'
import { withRouter } from "react-router-dom"
import {
  getStandings, getQuestionnaire
} from '../../Client/QuestionnaireClient';
import "./DetailResult.scss"

class DetailResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      standings: null,
      questionnaireId: null,
      questions: null
    }
    this.renderDetail = this.renderDetail.bind(this)
  }

  componentDidMount() {
    getStandings(this.props.match.params.id).then(res => {
      this.setState({
        standings: res.data,
        questionnaireId: res.data.questionnaire
      }, () => {
          getQuestionnaire(this.state.questionnaireId).then(res => {
            this.setState({
              questions: res.data.questions,
            })
          })
      })
    })

    
  }

  renderDetail() {
    return (
      <div className="card">
        <React.Fragment>
          <div className="detail-header">
            <h1>Username: {this.state.standings.user}</h1>
            <p>Total Score: {this.state.standings.score}</p>
          </div>
          <div className="detail-questions">
            {this.state.questions.map((question, idx) => {
              
              return (
                <div className="question" key={idx}>
                  {parseInt(this.state.standings.answers[idx]) === question.correct_idx ? (
                    <div style={{ color: 'green', fontWeight: "bold", float: "right"}}>
                      TRUE
                    </div>
                  ) : (
                    <div style={{ color: 'red', fontWeight: "bold", float: "right" }}>
                      FALSE
                    </div>
                  )}
                  <div className="question-text">{question.question}</div>
                  <div className="question-answer">{question.answer_option[this.state.standings.answers[idx]]}</div>
                </div>
              )
            })}
          </div>
        </React.Fragment>
      </div>
    )
  }

  render() {
    return (
      <div className="detail-result">
        {this.state.questions ? (
          this.renderDetail()
        ) : null}
        
      </div>
    )
  }
}

export default withRouter(DetailResult)