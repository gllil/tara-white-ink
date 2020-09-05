import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../components/Auth";
import { auth } from "../firebase/config";
import {
  Row,
  Col,
  Badge,
  Container,
  Form,
  Button,
  Jumbotron,
} from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";

const Login = ({ history }) => {
  const [form, setForm] = useState({});

  //get user info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const loginForm = document.querySelector(".loginForm");

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = form.email;
    let password = form.password;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        loginForm.reset();
        history.push("/admin");
      })
      .catch((error) => alert(error));
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/admin" />;
  }

  return (
    <Container>
      <div className="headerAbout">
        <Row>
          <Col className="text-right">
            <h5>
              <a href="/" className="aboutMeLink">
                <Badge className="aboutMeLinkStyle" pill variant="secondary">
                  Home
                </Badge>
              </a>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col className="logoContainerAbout">
            <div className="logoWrapperAbout">
              <h1>
                <span className="whiteAbout">White</span>
                <span className="inkAbout">ink</span>
              </h1>
              <img src={logo} alt="tara white logo" className="inkImageAbout" />
            </div>
          </Col>
        </Row>
      </div>
      <Row className="mt-5 mb-5">
        <Col>
          <Jumbotron className="jumbotron">
            <Row className="mt-2">
              <Col>
                <Form
                  className="loginForm"
                  onChange={handleChange}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </Form.Group>

                  <Button
                    className="loginBtn"
                    variant="secondary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
