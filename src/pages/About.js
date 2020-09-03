import React from "react";
import { Row, Col, Container, Badge } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestore from "../hooks/useFirestore";

const About = () => {
  const { docs } = useFirestore("pageInfo");
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
      <Row>
        <Col>
          <div className="aboutMeContainer">
            <Row>
              <Col className="text-center">
                <h1>About Me</h1>
              </Col>
            </Row>
            {docs &&
              docs.map((doc) => (
                <div>
                  <Row>
                    <Col className="text-center">
                      <img
                        src={doc.url}
                        alt="profile"
                        className="aboutMeImage"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="aboutMePgh">
                      <p>{doc.aboutMe}</p>
                      <p>
                        X 0 X O <br />
                        Tara
                      </p>
                    </Col>
                  </Row>
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
