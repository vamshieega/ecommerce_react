import { useState } from "react";
import styled from "styled-components";
import "./Register.css";

const Label = styled.label`
  font-size: 12px;
  color: gray;
`;

const Span = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
  display: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;
const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    console.log(e);
    setFocused(true);
  };

  return (
    <Container className="formInput">
      <Label>{label}</Label>
      <input
        className="inputField"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <Span>{errorMessage}</Span>
    </Container>
  );
};

export default FormInput;
