import React from "react";
import useFirestore from "../hooks/useFirestore";
import { projectFirestore, projectStorage } from "../firebase/config";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";

const AdminImageGrid = ({
  setSelectedImg,
  setOpen,
  setModalOpen,
  setImageId,
  setImgCaption,
}) => {
  const { docs } = useFirestore("images");

  const handleClick = (e, doc) => {
    e.preventDefault();
    setSelectedImg(doc);
    setOpen(true);
  };

  const handleDelete = (e, id, url) => {
    e.preventDefault();
    const imageRef = projectStorage.refFromURL(url);
    imageRef
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => console.error("Error removing document: ", error));
    projectFirestore
      .collection("images")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => console.error("Error removing document: ", error));
  };

  const handleEdit = (e, doc, id, caption) => {
    e.preventDefault();
    setModalOpen(true);
    setSelectedImg(doc);
    setImageId(id);
    setImgCaption(caption);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        {docs &&
          docs.map((doc) => (
            <Col
              className="image-border"
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={doc.id}
            >
              <Row>
                <Col
                  className="mt-2 text-center image-col"
                  onClick={(e) => handleClick(e, doc.url)}
                >
                  <div className="adminImageWrap text-center">
                    <Image src={doc.url} className="gallery-images" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-truncate">
                  <h5 className="mt-1">Caption:</h5>
                  {doc.caption ? (
                    <p>{doc.caption}</p>
                  ) : (
                    <p>Caption not added</p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="text-center m-1">
                  <Button
                    variant="warning"
                    size="small"
                    onClick={(e) => handleDelete(e, doc.id, doc.url)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    className="ml-1"
                    onClick={(e) => handleEdit(e, doc.url, doc.id, doc.caption)}
                  >
                    Edit
                  </Button>
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

export default AdminImageGrid;
