import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { projectFirestore, projectStorage } from "../firebase/config";
import { GlobalContext } from "../globalState/globalState";
import EditProgress from "./EditProgress";

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
  const [state, setState] = useContext(GlobalContext);
  const [openDeleteMessage, setOpenDeleteMessage] = useState(false);
  const [openEditMessage, setOpenEditMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);

  const listingsCollection = "listings";
  const types = ["image/png", "image/jpeg"];
  const editItemForm = document.getElementById("editItemForm");

  const listingsRef = projectFirestore.collection("listings");

  useEffect(() => {
    if (state.editRun) {
      const imageRef =
        originalImage && projectStorage.refFromURL(originalImage);
      listingsRef
        .doc(state.editFormData.id)
        .set(state.editFormData, { merge: true })
        .then(() => {
          if (originalImage) {
            imageRef.delete().then(() => {
              setState({
                editRun: false,
                editLoad: false,
                editFormData: {},
              });
              setEditSuccess(true);
              setTimeout(() => {
                setEditSuccess(false);
                handleCloseModal("edit");
              }, 2000);
            });
          } else {
            setState({
              editRun: false,
              editLoad: false,
              editFormData: {},
            });
            setEditSuccess(true);
            setTimeout(() => {
              setEditSuccess(false);
              handleCloseModal("edit");
            }, 2000);
          }
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.editRun]);

  console.log(originalImage);

  const handleDeleteItem = (e, itemId, url) => {
    const imageRef = projectStorage.refFromURL(url);
    e.preventDefault();
    setLoading(true);
    listingsRef
      .doc(itemId)
      .delete()
      .then(() => {
        if (url) {
          imageRef
            .delete()
            .then(() => {
              setSuccess(true);
              setLoading(false);
              setOpenDeleteMessage(false);
              setTimeout(() => {
                setSuccess(false);
              }, 2500);

              console.log("Image successfully deleted");
            })
            .catch((error) => {
              console.error("Error removing image: ", error);
            });
        } else {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setLoading(false);
            setOpenDeleteMessage(false);
          }, 2500);

          console.log("Image successfully deleted");
        }
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleOpenModal = (messageType) => {
    if (messageType === "edit") {
      setOpenEditMessage(true);
    }
    if (messageType === "delete") {
      setOpenDeleteMessage(true);
    }
  };

  const handleCloseModal = (messageType) => {
    if (messageType === "edit") {
      setOpenEditMessage(false);
    }
    if (messageType === "delete") {
      setOpenDeleteMessage(false);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setState({
      editFormData: {
        ...state.editFormData,
        [name]: value,
      },
    });
  };

  const handleEditImageChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const handleEditFormSubmit = (e, itemId, url) => {
    e.preventDefault();
    if (file) {
      setOriginalImage(url);
      setState({
        editLoad: true,
        editFormData: {
          ...state.editFormData,
          id: itemId,
        },
      });
    } else {
      listingsRef
        .doc(itemId)
        .set(state.editFormData, { merge: true })
        .then(() => {
          setState({
            editRun: false,
            editLoad: false,
            editFormData: {},
          });
          editItemForm.reset();
          setEditSuccess(true);
          setTimeout(() => {
            setEditSuccess(false);
            handleCloseModal("edit");
          }, 2000);
        })
        .catch((err) => console.error(err));
    }
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
            <Button
              onClick={() => handleOpenModal("edit")}
              size="sm"
              variant="secondary"
            >
              Edit Item
            </Button>
          )}{" "}
          {deleteItem && (
            <Button
              onClick={() => handleOpenModal("delete")}
              size="sm"
              variant="warning"
            >
              Delete Item
            </Button>
          )}
        </Card.Body>
      </Card>
      <Modal show={openDeleteMessage}>
        <Modal.Header
          closeButton
          onHide={() => handleCloseModal("delete")}
        ></Modal.Header>
        <Container className="mt-5 mb-5">
          <Row className="align-items-center">
            <Col className="text-center pb-3">
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
                  onClick={() => handleCloseModal("delete")}
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
      <Modal show={openEditMessage} size="xl">
        <Modal.Header closeButton onHide={() => handleCloseModal("edit")}>
          <h4>Edit Item Details</h4>
        </Modal.Header>
        <Container className="mt-3 mb-3">
          <Row>
            <Col>
              <Form
                id="editItemForm"
                onSubmit={(e) => handleEditFormSubmit(e, id, photo)}
              >
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control
                        onChange={handleEditFormChange}
                        type="text"
                        defaultValue={itemName}
                        name="name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Item Description</Form.Label>
                      <Form.Control
                        defaultValue={itemDescription}
                        onChange={handleEditFormChange}
                        as="textarea"
                        type="text"
                        name="description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>

                      <Form.Control
                        onChange={handleEditFormChange}
                        name="price"
                        type="text"
                        required
                        placeholder="0.00"
                        defaultValue={price}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        onChange={handleEditFormChange}
                        type="number"
                        name="quantity"
                        defaultValue={quantity}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        onChange={handleEditImageChange}
                        type="file"
                        name="url"
                      />
                    </Form.Group>
                    <img src={photo} width="50px" alt={itemName} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {editSuccess && (
                      <div className="success">
                        Item was updated successfully
                      </div>
                    )}
                    {error && <div className="error">{error}</div>}
                    {state.editLoad && file && (
                      <EditProgress
                        file={file}
                        setFile={setFile}
                        collection={listingsCollection}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCloseModal("edit")}
                    >
                      Cancel
                    </Button>{" "}
                    <Button
                      disabled={editSuccess}
                      type="submit"
                      variant="info"
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    </div>
  );
};

export default StoreItem;
