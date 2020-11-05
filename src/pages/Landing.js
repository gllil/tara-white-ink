import React, { useState } from "react";
import { Container, Row, Col, Carousel, Modal } from "react-bootstrap";
import Drawer from "../components/Drawer";
import HeaderMobile from "../components/HeaderMobile";
import ImageGridMobile from "../components/ImageGridMobile";
import useFirestore from "../hooks/useFirestore";

const Landing = () => {
  const { docs } = useFirestore("images");
  const [selectedImg, setSelectedImg] = useState(null);
  const [caption, setCaption] = useState(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid>
      {open && <img className="main-bg" src={selectedImg} alt="background" />}
      <Row>
        <Col className="p-0">
          <HeaderMobile />
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={10000}
            defaultActiveIndex={0}
            pause="hover"
            className="carousel"
            indicators={false}
          >
            {docs &&
              docs.map((doc) => (
                <Carousel.Item className="image-wrapper" key={doc.id}>
                  <img src={doc.url} alt={doc.name} className="images" />
                  <div className="overlay"></div>

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
      </Row>
      <Row className="mobile-image-grid">
        <Col>
          <ImageGridMobile
            setSelectedImg={setSelectedImg}
            setIndex={setIndex}
            setOpen={setOpen}
            setCaption={setCaption}
          />
          <Modal
            size="xl"
            show={open}
            onHide={handleModalClose}
            className="mobileModal"
            dialogClassName="modal-body"
            centered
          >
            <Modal.Body className="p-0 modal-body-wrap">
              <img src={selectedImg} className="modalImage" alt={caption} />
              {caption && selectedImg && (
                <div className="modal-image-text-wrapper">
                  <p className="modal-image-text">{caption}</p>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
