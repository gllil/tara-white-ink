import React, { useState } from "react";
import { Card, Button, Modal, Container, Row, Col } from "react-bootstrap";
import { projectFirestore, projectStorage } from "../firebase/config";

const StoreItem = ({
  id,
  itemName,
  itemDescription,
  price,
  quantity,
  photo,
  deleteItem,
  editItem,
  addCart,
  setSuccess,
}) => {
  const [openDeleteMessage, setOpenDeleteMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const listingsRef = projectFirestore.collection("listings");

  const handleDeleteItem = (e, itemId, url) => {
    const imageRef = projectStorage.refFromURL(url);
    e.preventDefault();
    setLoading(true);
    listingsRef
      .doc(itemId)
      .delete()
      .then(() => {
        imageRef
          .delete()
          .then(() => {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              setLoading(false);
              setOpenDeleteMessage(false);
            }, 2500);

            console.log("Image successfully deleted");
          })
          .catch((error) => {
            console.error("Error removing image: ", error);
          });
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenDeleteMessage(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpenDeleteMessage(false);
  };

  return (
    <div>
      <Card className="m-2" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={photo}
          style={{ height: 200, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{itemName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`$${price} USD`}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {`In Stock: ${quantity}`}
          </Card.Subtitle>
          <Card.Text>{itemDescription}</Card.Text>
          {addCart && (
            <Button size="sm" variant="secondary">
              Add to Cart
            </Button>
          )}{" "}
          {editItem && (
            <Button size="sm" variant="secondary">
              Edit Item
            </Button>
          )}{" "}
          {deleteItem && (
            <Button onClick={handleOpenModal} size="sm" variant="warning">
              Delete Item
            </Button>
          )}
        </Card.Body>
      </Card>
      <Modal show={openDeleteMessage}>
        <Modal.Header closeButton></Modal.Header>
        <Container className="mt-5 mb-5">
          <Row>
            <Col className="text-center">
              <h4>Are you sure you want to delete this item?</h4>
            </Col>
          </Row>

          <Row>
            {loading ? (
              <Col className="text-center">
                {loading && <h6>Deleting...</h6>}
              </Col>
            ) : (
              <Col>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>{" "}
                <Button
                  size="sm"
                  variant="warning"
                  onClick={(e) => handleDeleteItem(e, id, photo)}
                >
                  Yes, Delete
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </Modal>
    </div>
  );
};

export default StoreItem;
