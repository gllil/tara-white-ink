import React, { useState } from "react";
import { Container, Row, Col, Carousel, Modal, Image } from "react-bootstrap";
import Drawer from "../components/Drawer";
import HeaderMobile from "../components/HeaderMobile";
import ImageGrid from "../components/ImageGrid";
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

            {selectedImg && (
              <div>
                {caption && (
                  <Modal.Footer className="text-center modal-footer">
                    <Row>
                      <Col>
                        <p className="text-white">{`"${caption}"`}</p>
                      </Col>
                    </Row>
                  </Modal.Footer>
                )}
              </div>
            )}
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
