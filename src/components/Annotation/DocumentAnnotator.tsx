import React, { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import apiTerminal from "../../server/apiTerminal";
import { AnnotatedDocument } from "../../types/types";
import NewAnnotatedDocumentViewer from "./NewAnnotatedDocumentViewer";
import { parseBackendError } from "../../utils/parseErrorUtil";

const DocumentAnnotator = (): JSX.Element => {
  const defaultTextPlaceholder =
    "Alan Turing was born on 23/06/1912. During the Second World War, he worked as a scientist for the Government Code and Cypher School (currently GCHQ) at Bletchley Park, Britain's codebreaking centre that produced Ultra intelligence.";

  const emptyAnnotatedDoc = { text: "", mentions: [] };

  const [inputValue, setInputValue] = useState(defaultTextPlaceholder);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [annotatedDocResponse, setAnnotatedDocResposne] =
    useState<AnnotatedDocument>(emptyAnnotatedDoc);

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const analyzeInput = async () => {
    try {
      const res = await apiTerminal.analyzeInput(inputValue);
      console.log("Response from server:", res);
      setAnnotatedDocResposne(res);
    } catch (err: any) {
      const { error } = parseBackendError(err, "Annotation failed.");
      setErrorMessage(error);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formInputText">
              <Form.Control
                as="textarea"
                rows={5}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={analyzeInput}
              style={{ float: "right" }}
            >
              Analyze
            </Button>
          </Form>
        </Col>
        <Col>
          <NewAnnotatedDocumentViewer document={annotatedDocResponse} />
        </Col>
      </Row>

      <Modal show={showErrorModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentAnnotator;
