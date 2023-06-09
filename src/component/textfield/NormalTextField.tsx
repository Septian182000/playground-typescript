import { InputGroup, FormControl } from "react-bootstrap";
import React from "react";

interface NormalTextFieldProps {
  placeholder: string;
  input: string;
  onChanged: any;
}

export const NormalTextField: React.FC<NormalTextFieldProps> = ({
  placeholder,
  input,
  onChanged,
}) => {
  return (
    <InputGroup
      style={{
        height: 46,
        borderRadius: 6,
      }}
    >
      <FormControl
        placeholder={placeholder}
        value={input}
        onChange={onChanged}
        aria-label="time"
        style={{
          color: "black",
          fontFamily: "Rubik",
          fontWeight: 600,
          border: "1px solid rgba(65, 65, 80, 1)",
          backgroundColor: "white",
        }}
      />
    </InputGroup>
  );
};
