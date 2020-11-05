import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestoreDesc from "../hooks/useFirestoreDesc";

const HeaderMobile = () => {
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
    <Container className="header-mobile">
      <Row>
        <Col className="logoContainerMobile">
          <div className="logoWrapperMobile">
            <h1>
              <span className="whiteMobile">white</span>
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
    </Container>
  );
};

export default HeaderMobile;
