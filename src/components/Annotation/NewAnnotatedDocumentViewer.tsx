import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { AnnotatedDocument, AnnotationController } from "../../types/types";
import AnnotatedText from "./AnnotatedText";
import AnnotationsTable from "./AnnotationsTable";

interface Props {
  document: AnnotatedDocument;
}

const NewAnnotatedDocumentViewer = ({ document }: Props): JSX.Element => {
  const [annotationControllers, setAnnotationControllers] =
    useState<AnnotationController>([]);

  useEffect(() => {
    if (document.mentions && document.mentions.length > 0) {
      setAnnotationControllers(Array(document.mentions.length).fill(false));
    }
  }, [document]);

  const setAll = (value: boolean) => {
    setAnnotationControllers(Array(document.mentions.length).fill(value));
  };

  const toggleController = (index: number) => {
    setAnnotationControllers((prev) =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  const hasContent =
    document.text && document.mentions && document.mentions.length > 0;

  return (
    <>
      {hasContent && (
        <>
          <Row>
            <Col>
              <AnnotatedText
                text={document.text}
                mentions={document.mentions}
                annotationControllers={annotationControllers}
                setAll={setAll}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <AnnotationsTable
                mentions={document.mentions}
                annotationControllers={annotationControllers}
                toggleController={toggleController}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default NewAnnotatedDocumentViewer;
