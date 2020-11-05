import React from "react";
import useFirestore from "../hooks/useFirestore";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const ImageGridMobile = ({ setSelectedImg, setIndex, setOpen, setCaption }) => {
  const { docs } = useFirestore("images");

  const handleClick = (e, doc, index, caption) => {
    e.preventDefault();
    setSelectedImg(doc);
    setIndex(index);
    if (setCaption) {
      setCaption(caption);
    }
    if (setOpen) {
      setOpen(true);
    }
  };
  return (
    <Container className="imageGridContainer">
      <Row>
        {docs &&
          docs.map((doc, i) => (
            <Col
              xs={12}
              sm={6}
              className="image-col mt-2"
              onClick={(e) => handleClick(e, doc.url, i, doc.caption)}
              key={doc.id}
            >
              <div className="imageWrap">
                <img src={doc.url} alt={doc.name} className="gallery-images" />
                {doc.caption && (
                  <div className="gallery-image-text-wrapper">
                    <p className="gallery-image-text">{doc.caption}</p>
                  </div>
                )}
              </div>
            </Col>
          ))}
        {!docs.length && (
          <Col className="spinner">
            <Spinner animation="border" />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ImageGridMobile;
