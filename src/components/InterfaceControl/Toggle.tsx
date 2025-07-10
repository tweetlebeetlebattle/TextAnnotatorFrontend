import React from "react";

interface Props {
  label: string;
  onToggle: (value: boolean) => void;
  style?: React.CSSProperties;
}

const Toggle = ({ label, onToggle, style }: Props): JSX.Element => {
  return (
    <div style={style}>
      <button onClick={() => onToggle(true)}>All On</button>
      <button onClick={() => onToggle(false)}>All Off</button>
    </div>
  );
};

export default Toggle;
