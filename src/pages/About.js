import React from "react";
import { Row, Col, Container, Badge } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestoreDesc from "../hooks/useFirestoreDesc";

const About = () => {
  const { docs } = useFirestoreDesc("pageInfo");

  const formatPhoneNumber = (phoneNum) => {
    var cleaned = ("" + phoneNum).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };
  return (
    <Container className="aboutContainer">
      <div className="headerAbout">
        <Row>
          <Col className="text-right">
            <h4>
              <a href="/" className="aboutMeLink">
                <Badge className="aboutMeLinkStyle m-1" variant="secondary">
                  <i class="fas fa-home fa-lg"></i>
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
            <div key={doc.id}>
              <Row>
                <Col className="subtitleContainer">
                  <h2>{doc.subtitle}</h2>
                  <h4 className="mt-3">{doc.description}</h4>
                </Col>
              </Row>
              <Row>
                <Col className="text-center mt-3">
                  <a
                    className="intagramLink"
                    href={doc.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-3x instagram"></i>
                  </a>
                  <a className="emailLink" href={`mailto:${doc.email}`}>
                    <i className="far fa-envelope fa-3x ml-4 email"></i>
                  </a>
                  <h5 className="mt-3">{formatPhoneNumber(doc.phone)}</h5>
                </Col>
              </Row>
            </div>
          ))}
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
                      <p>
                        {doc.aboutMe.split("\n").map((paragraph, i) => (
                          <span key={i}>
                            {paragraph}
                            <br />
                          </span>
                        ))}
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
