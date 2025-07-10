import React from "react";
import { AnnotationMention } from "../../types/types";
import { Button } from "react-bootstrap";
import { annotationColorByType } from "../../styles/styles";

interface Props {
  mention: AnnotationMention;
  index: number;
  controller: boolean;
  toggleController: (i: number) => void;
}

const AnnotationRow = ({
  mention,
  index,
  controller,
  toggleController,
}: Props) => {
  const buttonStyle = controller
    ? {
        backgroundColor: annotationColorByType[mention.type],
        borderColor: annotationColorByType[mention.type],
        color: "black",
      }
    : {};

  return (
    <tr key={`${mention.type}-${index}`}>
      <td>
        <code>{mention.type}</code>
      </td>
      <td>
        <em>"{mention.content}"</em>
      </td>
      <td>
        {mention.metadata?.iso_date ? (
          <code>{mention.metadata.iso_date}</code>
        ) : (
          ""
        )}
      </td>
      <td>
        {["PERSON", "ORGANISATION", "ROLE"].includes(mention.type) && (
          <a
            href={`/search?q=${
              mention.content
            }&t=${mention.type.toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
          >
            Lookup
          </a>
        )}
      </td>
      <td>
        <Button
          size="sm"
          onClick={() => toggleController(index)}
          style={{
            ...buttonStyle,
            width: "110px",
          }}
        >
          {controller ? "Unhighlight" : "Highlight"}
        </Button>
      </td>
    </tr>
  );
};

export default AnnotationRow;
