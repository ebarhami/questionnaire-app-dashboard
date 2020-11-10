import React from 'react'
import { withRouter } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Zoom from 'react-reveal/Zoom';
import 'bootstrap/dist/css/bootstrap.css';

import "./Home.scss"
import {
  createUser
} from '../../Client/UserClient';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formUsername: ""
    }
    this.submitFormHandler = this.submitFormHandler.bind(this)
  }

  submitFormHandler(e) {
    e.preventDefault()

    const data = {
      username: this.state.formUsername,
    };

    createUser(data)
      .then(async () => {
        await this.props.setUsername(this.state.formUsername)
        this.props.history.push("/questionnaire")
      })
      .catch(err => console.log("error" + err));
  }

  render() {
    return (
      <div className="Home">
        <Zoom down>
          <h1>
            Welcome to Quiz
          </h1>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" onChange={e => this.setState({ formUsername: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={this.state.formUsername === ""} onClick={e => this.submitFormHandler(e)}>
              Submit
          </Button>
          </Form>
        </Zoom>
      </div>
    )
  }
} 

export default withRouter(Home) 