import React, { useState } from "react";
import {
  Modal,
  Image,
  Button,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import UploadForm from "../components/UploadForm";
import AdminImageGrid from "../components/AdminImageGrid";
import { projectFirestore } from "../firebase/config";
import UploadProfile from "../components/UploadProfile";
import useFirestore from "../hooks/useFirestore";

const Admin = () => {
  const { docs } = useFirestore("pageInfo");
  const imagesRef = projectFirestore.collection("images");
  const pageDataRef = projectFirestore.collection("pageInfo");
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imgCaption, setImgCaption] = useState(null);
  const [caption, setCaption] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [noSuccess, setNoSuccess] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCaption(value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    let data = caption;
    imagesRef
      .doc(imageId)
      .set(
        {
          caption: data,
        },
        { merge: true }
      )
      .then(() => setModalOpen(false));
  };

  const handleBlank = (e) => {
    e.preventDefault();

    imagesRef
      .doc(imageId)
      .set(
        {
          caption: "",
        },
        { merge: true }
      )
      .then(() => setModalOpen(false));
  };

  const handleForm = (e) => {
    const { dataset, value } = e.target;

    setFormData({ ...formData, [dataset.property]: value });
  };
  const fullForm = document.querySelector(".form");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullForm) {
      pageDataRef
        .doc("6lWTkNKLtZMq9u6pfV3h")
        .set(formData, { merge: true })
        .then(() => {
          setSuccessModal(true);
          fullForm.reset();
        })
        .catch((err) => console.log(err));
    } else {
      setErrorModal(true);
    }
  };

  return (
    <div className="adminMain">
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Page Admin</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {docs ? (
              docs.map((doc) => (
                <Form onChange={handleForm} className="form" key={doc.id}>
                  <Form.Group>
                    <Form.Label>Page Subtitle</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={doc.subtitle}
                      data-property="subtitle"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Intoduction title</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={doc.introductionTitle}
                      data-property="introductionTitle"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Intoduction Sentence</Form.Label>
                    <Form.Control
                      type="text"
                      data-property="introductionSentence"
                      defaultValue={doc.introductionSentence}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>About Me Paragraph</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      defaultValue={doc.aboutMe}
                      data-property="aboutMe"
                    />
                  </Form.Group>
                  <Button onClick={handleSubmit}>Update</Button>
                </Form>
              ))
            ) : (
              <Form onChange={handleForm} className="form">
                <Form.Group>
                  <Form.Label>Page Subtitle</Form.Label>
                  <Form.Control type="text" data-property="subtitle" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Intoduction title</Form.Label>
                  <Form.Control type="text" data-property="introductionTitle" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Intoduction Sentence</Form.Label>
                  <Form.Control
                    type="text"
                    data-property="introductionSentence"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>About Me Paragraph</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    data-property="aboutMe"
                  />
                </Form.Group>
                <Button onClick={handleSubmit}>Update</Button>
              </Form>
            )}

            <Modal className="p-2" show={successModal}>
              <Row>
                <Col>
                  <h3>Updated Successfully</h3>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button onClick={() => setSuccessModal(false)}>Close</Button>
                </Col>
              </Row>
            </Modal>
            <Modal className="p-2" show={errorModal}>
              <Row>
                <Col>
                  <h3>One or more lines must be filled in order to submit</h3>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button onClick={() => setErrorModal(false)}>Close</Button>
                </Col>
              </Row>
            </Modal>
            <Modal className="p-2" show={noSuccess}>
              <Row>
                <Col>
                  <h3>Error:</h3>
                  <p>Form was not submitted successfully</p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button onClick={() => setNoSuccess(false)}>Close</Button>
                </Col>
              </Row>
            </Modal>
          </Col>
        </Row>
      </Container>
      <hr />
      <UploadProfile />
      <hr />
      <UploadForm />
      <AdminImageGrid
        setSelectedImg={setSelectedImg}
        setOpen={setOpen}
        setModalOpen={setModalOpen}
        setImageId={setImageId}
        setImgCaption={setImgCaption}
      />
      <Modal show={open} onHide={handleClose}>
        <Image src={selectedImg} rounded className="modalImage" />
      </Modal>
      <Modal show={modalOpen} onHide={handleClose}>
        <Form className="p-3">
          <Form.Group>
            <Form.Label>Edit or Add Caption</Form.Label>
            <Row>
              <Col>
                <img
                  src={selectedImg}
                  alt="modal"
                  width="100"
                  className="p-1"
                />
              </Col>
            </Row>

            <Form.Control
              as="textarea"
              type="text"
              defaultValue={imgCaption}
              data-property={selectedImg}
              onChange={handleChange}
            />
            <Button className="m-1" onClick={handleSave}>
              Save
            </Button>
            <Button className="m-1" onClick={handleBlank}>
              No Caption
            </Button>
            <Button className="m-1" onClick={handleClose}>
              Close
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col></Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Admin;
