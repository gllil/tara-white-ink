import React from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestore from "../hooks/useFirestore";

const HeaderMobile = () => {
  const { docs } = useFirestore("pageInfo");

  const formatPhoneNumber = (phoneNum) => {
    var cleaned = ("" + phoneNum).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };
  return (
    <div className="header-mobile">
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
                <h3 key={doc.id}>{doc.subtitle}</h3>
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
  );
};

export default HeaderMobile;
