import React from "react";
import { Row, Col, Jumbotron, Container } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestore from "../hooks/useFirestore";

const HeaderMobile = () => {
  const { docs } = useFirestore("pageInfo");
  return (
    <div className="header-mobile">
      <Row>
        <Col className="logoContainerMobile">
          <div className="logoWrapperMobile">
            <h1>
              <span className="whiteMobile">White</span>
              <span className="inkMobile">ink</span>
            </h1>
            <img src={logo} alt="tara white logo" className="inkImageMobile" />
          </div>
        </Col>
      </Row>
      {docs &&
        docs.map((doc) => (
          <div key={doc.id}>
            <Row>
              <Col className="subtitleContainer">
                <h5 key={doc.id}>{doc.subtitle}</h5>
              </Col>
            </Row>
            <Row className="mt-5">
              <Container>
                <Jumbotron>
                  <Row>
                    <Col className="introduction">
                      <h2>{doc.introductionTitle}</h2>
                      <h5 className="introSentence">
                        {doc.introductionSentence}
                      </h5>
                    </Col>
                  </Row>
                </Jumbotron>
              </Container>
            </Row>
          </div>
        ))}
    </div>
  );
};

export default HeaderMobile;
