import React from "react";
import { Row, Col, Container, Badge } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestore from "../hooks/useFirestore";

const About = () => {
  const { docs } = useFirestore("pageInfo");
  return (
    <Container className="aboutContainer">
      <div className="headerAbout">
        <Row>
          <Col className="text-right">
            <h4>
              <a href="/" className="aboutMeLink">
                <Badge
                  pill
                  className="aboutMeLinkStyle m-1"
                  variant="secondary"
                >
                  <i class="fas fa-home fa-2x"></i>
                </Badge>
              </a>
            </h4>
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
        {docs &&
          docs.map((doc) => (
            <Row key={doc.id}>
              <Col className="subtitleContainer">
                <h3 key={doc.id}>{doc.subtitle}</h3>
              </Col>
            </Row>
          ))}
        <Row>
          <Col className="text-center mt-3">
            <a
              className="intagramLink"
              href="https://www.instagram.com/tara.whiteink/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-3x instagram"></i>
            </a>
            <a className="emailLink" href="mailto:WinterWhite2019@gmail.com">
              <i className="far fa-envelope fa-3x ml-4 email"></i>
            </a>
            <h5 className="mt-3">(801) 555-5555</h5>
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
