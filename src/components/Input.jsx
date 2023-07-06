import styled from "styled-components";
import { useField } from "formik";

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  color: #000;
  display: block;
  margin-bottom: 5px;
`;
const CustomInput = styled.input`
  outline: none;
  padding: 8px;
  border: solid 1px #b1b3b5;
  border-radius: 4px;
  width: 60%;
`;
function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <SearchContainer>
      <Label>{label}</Label>
      <CustomInput {...field} {...props}></CustomInput>
    </SearchContainer>
  );
}

export default Input;
