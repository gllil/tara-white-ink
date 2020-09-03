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
              <div onClick={(e) => handleClose(e)}>
                <i className="fas fa-times cross"></i>
              </div>
              <Row>
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
              <Row>
                <Col className="subtitleContainer">
                  {docs &&
                    docs.map((doc) => <h4 key={doc.id}>{doc.subtitle}</h4>)}
                </Col>
              </Row>
              <Row>
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
