import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../auth/Auth";
import { auth } from "../firebase/config";
import {
  Row,
  Col,
  Badge,
  Container,
  Form,
  Button,
  Jumbotron,
  Modal,
} from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";

const Login = ({ history }) => {
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

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

  const handleEmail = (e) => {
    const { value } = e.target;
    console.log(value);
    setEmail(value);
  };

  const sendPasswordReset = (e) => {
    e.preventDefault();

    // [START sendpasswordemail]
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setSuccess(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === "auth/invalid-email") {
          alert(errorMessage);
        } else if (errorCode === "auth/user-not-found") {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    // [END sendpasswordemail];
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
                <span className="whiteAbout">white</span>
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
                    <Form.Label>Enter Your Email address</Form.Label>
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

                  <Modal show={open} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Password Reset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {success ? (
                        <Container>
                          <Row>
                            <Col className="text-center">
                              <h1>Password Reset Successfully Sent</h1>
                              <p>
                                You will receive an email with a password reset
                                link shortly.
                              </p>
                            </Col>
                          </Row>
                        </Container>
                      ) : (
                        <Form>
                          <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              data-property="email"
                              onChange={handleEmail}
                            />
                          </Form.Group>
                          <Form.Text>
                            Once submitted an email will be sent to you shortly.
                          </Form.Text>
                        </Form>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      {!success && (
                        <Button variant="primary" onClick={sendPasswordReset}>
                          Send Password Reset
                        </Button>
                      )}
                    </Modal.Footer>
                  </Modal>

                  <Button
                    className="loginBtn"
                    variant="secondary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>

                <Button
                  className="mt-2 p-0 ml-0"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#333",
                  }}
                  onClick={(e) => handleOpen(e)}
                >
                  Forgot Password?
                </Button>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
