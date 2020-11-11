import React from 'react';
import { withRouter } from "react-router-dom"
import QuestionnaireList from "./QuestionnaireList"
import "./Questionnaire.scss"
import 'bootstrap/dist/css/bootstrap.css';
import {
  answerQuestionnaire
} from '../../Client/QuestionnaireClient';


class Questionnaire extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questionnaireChoosen: null,
      currentQuestion: 0,
      answers: [],
      isDone: false,
      score: -1
    }
    this.handleChooseAnswer = this.handleChooseAnswer.bind(this)
    this.chooseQuestionnaire = this.chooseQuestionnaire.bind(this)
    this.sendAnswer = this.sendAnswer.bind(this)
    this.jumpToBoard = this.jumpToBoard.bind(this)
  }

  chooseQuestionnaire(questionnaire) {
    this.setState({
      questionnaireChoosen: questionnaire
    });
  }

  handleChooseAnswer(answer) {
    this.setState({
      answers: this.state.answers.concat(answer),
    });
    const nextQuestion = this.state.currentQuestion + 1;
    if (nextQuestion < this.state.questionnaireChoosen.questions.length) {
      this.setState({
        currentQuestion: nextQuestion,
      });
    } else {
      this.setState({
        isDone: true,
      });
    }
  }

  sendAnswer(data) {
    answerQuestionnaire(data)
      .then(res => {
        this.setState({
          score: res.data.score
        })
      })
      .catch(err => console.log("error" + err));
  }

  jumpToBoard() {
    this.props.history.push("/standings")
  }

  render() {
    let comp;
    if (!this.props.user) {
      this.props.history.push("/")
    } else if (this.state.isDone) {
      const data = {
        user: this.props.user._id,
        questionnaire: this.state.questionnaireChoosen,
        answers: this.state.answers
      }

      if (this.state.score === -1) {
        this.sendAnswer(data)
      }
      
      comp = 
        <div className='done-section' >
          You answered {this.state.score} question correct
          <button onClick={this.jumpToBoard}>Go to scoreboards</button>
        </div>
    } else if (!this.props.questionnaire) {
      this.props.setQuestionnaire()
    } else if (!this.state.questionnaireChoosen) {
      comp = <QuestionnaireList questionnaire={this.props.questionnaire} chooseQuestionnaire={this.chooseQuestionnaire}/>
    } else {
      const quiz = this.state.questionnaireChoosen.questions
      comp = 
        <>
        <div className='app' >
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {this.state.currentQuestion + 1}</span>/{quiz.length}
            </div>
            <div className='question-text'>{quiz[this.state.currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {quiz[this.state.currentQuestion].answer_option.map((option, i) => (
              <button key={i} onClick={() => this.handleChooseAnswer(i)}>{option}</button>
            ))}
          </div>
        </div>
        </>
    }
    return (
      <div className='questionnaire' >
        {comp}
      </div >
    )
  }
}

export default withRouter(Questionnaire)
