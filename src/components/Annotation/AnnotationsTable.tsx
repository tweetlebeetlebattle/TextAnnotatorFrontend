import React from "react";
import { Table } from "react-bootstrap";
import { AnnotationMention, AnnotationController } from "../../types/types";
import AnnotationRow from "./AnnotationRow";

interface Props {
  mentions: AnnotationMention[];
  annotationControllers: AnnotationController;
  toggleController: (i: number) => void;
}

const AnnotationsTable = ({
  mentions,
  annotationControllers,
  toggleController,
}: Props) => (
  <Table size="sm">
    <thead>
      <tr>
        <th>Type</th>
        <th>Content</th>
        <th>Meta</th>
        <th>Link</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {mentions.map((mention, index) => (
        <AnnotationRow
          key={index}
          mention={mention}
          index={index}
          controller={annotationControllers[index]}
          toggleController={toggleController}
        />
      ))}
    </tbody>
  </Table>
);

export default AnnotationsTable;
