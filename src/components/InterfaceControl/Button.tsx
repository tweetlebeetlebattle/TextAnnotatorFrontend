import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  style?: React.CSSProperties;
  size?: "sm" | "lg";
  disabled?: boolean;
}

const Button = ({
  onClick,
  label,
  variant = "primary",
  style = {},
  size,
  disabled = false,
}: ButtonProps): JSX.Element => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const classes = `btn btn-${variant} ${sizeClass}`;

  return (
    <button
      className={classes}
      style={{ margin: "0.25rem", ...style }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
