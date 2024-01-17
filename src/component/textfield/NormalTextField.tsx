import React from "react";
import { InputGroup, FormControl, FormControlProps } from "react-bootstrap";

type NormalTextFieldType = FormControlProps;

export const NormalTextField: React.FC<NormalTextFieldType> = ({
  children,
  ...props
}: NormalTextFieldType) => {
  return (
    <InputGroup
      style={{
        height: 46,
        borderRadius: 6,
      }}
    >
      <FormControl
        {...props}
        style={{
          color: "black",
          fontFamily: "Rubik",
          fontWeight: 600,
          border: "1px solid rgba(65, 65, 80, 1)",
          backgroundColor: "white",
        }}
      />
      {children ? (
        <InputGroup.Text
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(65, 65, 80, 1)",
            borderLeft: "transparent",
            cursor: "pointer",
          }}
        >
          {children}
        </InputGroup.Text>
      ) : (
        ""
      )}
    </InputGroup>
  );
};
