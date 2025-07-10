import React from "react";
import { AnnotationMention, AnnotationController } from "../../types/types";
import { annotationColorByType, toggleStyle } from "../../styles/styles";
import Toggle from "../InterfaceControl/Toggle";

interface Props {
  text: string;
  mentions: AnnotationMention[];
  annotationControllers: AnnotationController;
  setAll: (value: boolean) => void;
}

const AnnotatedText = ({
  text,
  mentions,
  annotationControllers,
  setAll,
}: Props): JSX.Element => {
  const sortedMentions = mentions
    .map((mention, index) => ({ ...mention, index }))
    .sort((a, b) => a.begin_offset - b.begin_offset);

  let cursor = 0;
  const chunks: JSX.Element[] = [];

  for (const {
    begin_offset,
    end_offset,
    content,
    type,
    index,
  } of sortedMentions) {
    if (!annotationControllers[index]) continue;

    if (begin_offset > cursor) {
      chunks.push(
        <span key={`plain-${cursor}`}>{text.slice(cursor, begin_offset)}</span>
      );
    }

    chunks.push(
      <span
        key={`annot-${index}`}
        style={{
          backgroundColor: annotationColorByType[type],
          padding: "0.1rem",
        }}
      >
        {text.slice(begin_offset, end_offset)}
      </span>
    );

    cursor = end_offset;
  }

  if (cursor < text.length) {
    chunks.push(<span key="final">{text.slice(cursor)}</span>);
  }

  return (
    <div>
      <Toggle label="Annotate All" onToggle={setAll} style={toggleStyle} />
      <p>{chunks}</p>
    </div>
  );
};

export default AnnotatedText;
