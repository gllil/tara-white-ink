import React from "react";
import useFirestore from "../hooks/useFirestore";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImg, setIndex, setOpen, setCaption }) => {
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
            <Col xs={12} sm={6} key={doc.id}>
              <Row>
                <Col
                  className="image-col mt-2 text-center"
                  onClick={(e) => handleClick(e, doc.url, i, doc.caption)}
                >
                  <motion.div whileHover={{ scale: 1.1 }} className="imageWrap">
                    <img
                      src={doc.url}
                      alt={doc.name}
                      className="gallery-images"
                    />
                  </motion.div>
                </Col>
              </Row>
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

export default ImageGrid;
