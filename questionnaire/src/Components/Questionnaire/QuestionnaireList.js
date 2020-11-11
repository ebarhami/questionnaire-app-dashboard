import React from 'react';
import Button from 'react-bootstrap/Button'
import "./QuestionnaireList.scss"

class QuestionnaireList extends React.Component {

  render() {
    return (
      <React.Fragment>
        <br></br><h1>Choose Quiz</h1> <br></br>
        
        <div className="not-choosen">
        {this.props.questionnaire.map((questionnaire, i) => (
          <div className="card" key={i}>
            <div className="face face1">
              <div className="content">

                <h3>{questionnaire.topic}</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <Button variant="primary" type="submit" onClick={e => this.props.chooseQuestionnaire(questionnaire)}>
                  Take Quiz
                </Button>
              </div>
            </div>
          </div>
        ))}
        </div>
        
        
      </React.Fragment>
    )
  }
}

export default QuestionnaireList