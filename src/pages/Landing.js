import React, { useState } from "react";
import { Container, Row, Col, Carousel, Modal, Image } from "react-bootstrap";
import Drawer from "../components/Drawer";
// import logo from "../assets/images/mainLogo.png";
// import { CSSTransition } from "react-transition-group";
import HeaderMobile from "../components/HeaderMobile";
import ImageGrid from "../components/ImageGrid";
import useFirestore from "../hooks/useFirestore";

const Landing = () => {
  const { docs } = useFirestore("images");
  // const pageinfo = useFirestore("pageInfo").docs;
  const [selectedImg, setSelectedImg] = useState(null);
  const [caption, setCaption] = useState(null);
  const [index, setIndex] = useState(0);
  // const [show, setShow] = useState(true);
  // const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // const handleClose = (e) => {
  //   e.preventDefault();

  //   setShow(false);
  //   setMenu(true);
  // };

  // const handleOpen = (e) => {
  //   e.preventDefault();

  //   setShow(true);
  //   setMenu(false);
  // };

  return (
    <Container fluid>
      {selectedImg && (
        <img className="main-bg" src={selectedImg} alt="background" />
      )}
      <Row>
        <Col className="p-0">
          <HeaderMobile />
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={10000}
            pause="hover"
            className="carousel"
          >
            {docs &&
              docs.map((doc) => (
                <Carousel.Item className="image-wrapper" key={doc.id}>
                  <img src={doc.url} alt={doc.name} className="images" />
                  <div className="overlay"></div>
                  {/* {menu && (
                    <div onClick={(e) => handleOpen(e)}>
                      <i className="fas fa-bars menuLg"></i>
                    </div>
                  )} */}
                  {doc.caption && (
                    <Carousel.Caption className="caption">
                      {`"${doc.caption}"`}
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
        <Drawer setSelectedImg={setSelectedImg} setIndex={setIndex} />

        {/* <CSSTransition
          in={show}
          unmountOnExit
          timeout={1000}
          classNames="navMenuLg"
        >
          <Col className="nav-container-lg" lg={2}>
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
            {pageinfo &&
              pageinfo.map((doc) => (
                <div>
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
        </CSSTransition> */}
      </Row>
      <Row className="mobile-image-grid">
        <Col>
          <ImageGrid
            setSelectedImg={setSelectedImg}
            setIndex={setIndex}
            setOpen={setOpen}
            setCaption={setCaption}
          />
          <Modal show={open} onHide={handleModalClose} className="mobileModal">
            <Modal.Body className="p-0">
              <Image src={selectedImg} className="modalImage" />
            </Modal.Body>
            {caption && (
              <Modal.Footer className="text-center modal-footer">
                <Row>
                  <Col>
                    <p className="text-white">{`"${caption}"`}</p>
                  </Col>
                </Row>
              </Modal.Footer>
            )}
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
