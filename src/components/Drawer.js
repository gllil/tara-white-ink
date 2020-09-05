import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
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
                <Col className="text-left" xs={3}>
                  <div onClick={(e) => handleClose(e)}>
                    <i className="fas fa-times fa-2x closeArrow pl-2"></i>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="logoContainerAbout">
                  <div className="logoWrapperAbout">
                    <h1>
                      <span className="whiteAbout">white</span>
                      <span className="inkAbout">ink</span>
                    </h1>
                    <img
                      src={logo}
                      alt="tara white logo"
                      className="inkImageAbout"
                    />
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
                  <a
                    className="emailLink"
                    href="mailto:WinterWhite2019@gmail.com"
                  >
                    <i className="far fa-envelope fa-3x ml-4 email"></i>
                  </a>
                  <h5 className="mt-3">(801) 555-5555</h5>
                </Col>
              </Row>

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

          <Nav fill justify className="drawerNav">
            <Nav.Item>
              <Nav.Link href="/about">
                <h5>Learn more</h5>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </CSSTransition>
    </div>
  );
};

export default Drawer;
