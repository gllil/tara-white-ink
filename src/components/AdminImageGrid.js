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

  const handleDelete = (e, id, url, num) => {
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
    projectFirestore
      .collection("images")
      .where("orderNum", ">", num)
      .get()
      .then((res) => {
        res.docs.forEach((n) => {
          let originalNum = n.data().orderNum;
          let newNum = originalNum - 1;

          n.ref
            .update({ orderNum: newNum })
            .then(() => console.log("updated other docs order numbers"))
            .catch((err) => console.log(err));
        });
      });
  };

  const handleEdit = (e, doc, id, caption) => {
    e.preventDefault();
    setModalOpen(true);
    setSelectedImg(doc);
    setImageId(id);
    setImgCaption(caption);
  };

  const increaseOrder = (e, order) => {
    e.preventDefault();
    let queueNum = order;
    let nextQueueNum = order + 1;
    let newQueueNum = queueNum + 1;
    let newNextQueueNum = order;
    const imageOrderRef = projectFirestore.collection("images");

    if (queueNum < docs.length) {
      imageOrderRef
        .where("orderNum", "==", queueNum)
        .get()
        .then((res) => {
          const num = res.docs[0];
          num.ref
            .update({ orderNum: newQueueNum })
            .then(() => console.log("Successful Increase"))
            .catch((err) => console.log(err));
        });

      imageOrderRef
        .where("orderNum", "==", nextQueueNum)
        .get()
        .then((res) => {
          const num = res.docs[0];
          num.ref
            .update({ orderNum: newNextQueueNum })
            .then(() => console.log("Successful Increase"))
            .catch((err) => console.log(err));
        });
    } else {
      console.log("You are at the end of the list");
    }
  };

  const decreaseOrder = (e, order) => {
    e.preventDefault();
    let queueNum = order;
    let prevQueueNum = order - 1;
    let newQueueNum = queueNum - 1;
    let newNextQueueNum = order;
    const imageOrderRef = projectFirestore.collection("images");

    if (queueNum > 1) {
      imageOrderRef
        .where("orderNum", "==", queueNum)
        .get()
        .then((res) => {
          const num = res.docs[0];
          num.ref
            .update({ orderNum: newQueueNum })
            .then(() => console.log("Successful Decrease"))
            .catch((err) => console.log(err));
        });

      imageOrderRef
        .where("orderNum", "==", prevQueueNum)
        .get()
        .then((res) => {
          const num = res.docs[0];
          num.ref
            .update({ orderNum: newNextQueueNum })
            .then(() => console.log("Successful Decrease"))
            .catch((err) => console.log(err));
        });
    } else {
      console.log("You are at the beginning of the list");
    }
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
                  {doc.orderNum > 1 && (
                    <Button
                      className="mr-1 p-1 arrowBtn"
                      variant="info"
                      onClick={(e) => decreaseOrder(e, doc.orderNum)}
                    >
                      <i className="fas fa-caret-left"></i>
                    </Button>
                  )}

                  <Button
                    variant="warning"
                    size="small"
                    onClick={(e) =>
                      handleDelete(e, doc.id, doc.url, doc.orderNum)
                    }
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
                  {doc.orderNum < docs.length && (
                    <Button
                      className="ml-1 p-1 arrowBtn"
                      variant="info"
                      onClick={(e) => increaseOrder(e, doc.orderNum)}
                    >
                      <i className="fas fa-caret-right"></i>
                    </Button>
                  )}
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
