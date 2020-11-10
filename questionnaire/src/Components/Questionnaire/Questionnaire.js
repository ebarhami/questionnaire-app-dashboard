import React from 'react';
import { withRouter } from "react-router-dom"
import QuestionnaireList from "./QuestionnaireList"
import "./Questionnaire.scss"
import 'bootstrap/dist/css/bootstrap.css';


class Questionnaire extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questionnaireChoosen: "",
      currentQuestion: 0,
      answers: [],
      isDone: false,
      questions: [
        {
          questionText: 'What is the capital of France?',
          answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Dublin', isCorrect: false },
          ],
        },
        {
          questionText: 'Who is CEO of Tesla?',
          answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Bill Gates', isCorrect: false },
            { answerText: 'Tony Stark', isCorrect: false },
          ],
        },
        {
          questionText: 'The iPhone was created by which company?',
          answerOptions: [
            { answerText: 'Apple', isCorrect: true },
            { answerText: 'Intel', isCorrect: false },
            { answerText: 'Amazon', isCorrect: false },
            { answerText: 'Microsoft', isCorrect: false },
          ],
        },
        {
          questionText: 'How many Harry Potter books are there?',
          answerOptions: [
            { answerText: '1', isCorrect: false },
            { answerText: '4', isCorrect: false },
            { answerText: '6', isCorrect: false },
            { answerText: '7', isCorrect: true },
          ],
        },
      ]
    }
    this.handleChooseAnswer = this.handleChooseAnswer.bind(this)
  }

  handleChooseAnswer(answer) {
    this.setState({
      answers: this.state.answers.push(answer),
    });

    const nextQuestion = this.state.currentQuestion + 1;
    if (nextQuestion < this.state.questions.length) {
      this.setState({
        currentQuestion: nextQuestion,
      });
    } else {
      this.setState({
        isDone: true,
      });
    }
  }
  render() {
    let comp;
    if (this.props.username === "") {
      this.props.history.push("/")
    } else if (this.state.isDone) {
      comp = 
        <div className='done-section' >
          Done
        </div>
    } else if (!this.props.questionnaire) {
      this.props.setQuestionnaire()
    } else if (this.state.questionnaireChoosen === "") {
      comp = <QuestionnaireList questionnaire={this.props.questionnaire}/>
    } else {
      comp = 
        <>
        <div className='app' >
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {this.state.currentQuestion + 1}</span>/{this.state.questions.length}
            </div>
            <div className='question-text'>{this.state.questions[this.state.currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {this.state.questions[this.state.currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => this.handleChooseAnswer(answerOption.isCorrect)}>{answerOption.answerText}</button>
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
