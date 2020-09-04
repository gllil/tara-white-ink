import React, { useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import logo from "../assets/images/mainLogo.png";
import useFirestore from "../hooks/useFirestore";
import { CSSTransition } from "react-transition-group";
import ImageGrid from "./ImageGrid";

const Drawer = ({ setSelectedImg, setIndex }) => {
  const { docs } = useFirestore("pageInfo");
  const [show, setShow] = useState(true);
  const [menu, setMenu] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    console.log("close");
    setShow(false);
    setMenu(true);
  };

  const handleOpen = (e) => {
    e.preventDefault();

    setShow(true);
    setMenu(false);
  };

  return (
    <div>
      {menu && (
        <div onClick={(e) => handleOpen(e)}>
          <i className="fas fa-bars menu"></i>
        </div>
      )}

      <CSSTransition
        in={show}
        unmountOnExit
        timeout={1000}
        classNames="navMenuMd"
      >
        <Container className="nav-container">
          <Row>
            <Col className="titleLogo">
              <Row>
                <Col>
                  <div onClick={(e) => handleClose(e)}>
                    <i className="fas fa-angle-right fa-2x closeArrow"></i>
                  </div>
                </Col>
                <Col className="text-right">
                  <h5>
                    <a href="/about" className="aboutMeLink">
                      <Badge
                        className="aboutMeLinkStyle"
                        pill
                        variant="secondary"
                      >
                        About Me
                      </Badge>
                    </a>
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col className="logoContainer">
                  <h1>
                    <span className="white">White</span>
                    <span className="ink">ink</span>
                  </h1>
                  <img src={logo} alt="tara white logo" className="inkImage" />
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
                      <Col className="introduction">
                        <h2>{doc.introductionTitle}</h2>
                        <h5 className="introSentence">
                          {doc.introductionSentence}
                        </h5>
                      </Col>
                    </Row>
                  </div>
                ))}
              <Row className="mt-5">
                <Col>
                  <ImageGrid
                    setSelectedImg={setSelectedImg}
                    setIndex={setIndex}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </CSSTransition>
    </div>
  );
};

export default Drawer;
