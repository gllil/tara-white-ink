import React from "react";
import { Row, Col } from "react-bootstrap";
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
      <Row>
        <Col className="subtitleContainer">
          {docs && docs.map((doc) => <h4 key={doc.id}>{doc.subtitle}</h4>)}
        </Col>
      </Row>
    </div>
  );
};

export default HeaderMobile;
