import React from 'react';
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
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                  {/* <a href="#">Read More</a> */}
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