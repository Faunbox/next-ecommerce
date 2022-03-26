import { Button } from "react-bootstrap";
import styled from "styled-components";

///Phone Menu
export const StyledPhoneWrapper = styled.div`
  position: relative;
  text-align: center;
`;
export const StyledPhoneMenuIconsList = styled.ul`
  display: flex;
  list-style: none;
`;
export const StyledPhoneMenu = styled.section`
  background-color: white;
  text-align: center;
`;
export const StyledPhoneMenuOptionsList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 0;
  list-style: none;
  font-size: 1.2rem;
`;
export const StyledPhoneNavIcon = styled.button`
  margin: 0 15px;
  border: none;
  background-color: transparent;
`;
export const StyledInputWrapper = styled.div``;
export const StyledInput = styled.input`
  height: 2rem;
  margin: 20px 0;
`;
export const StyledSearchButton = styled(Button)`
  margin-left: 10px;
`;

export const StyledUserButtons = styled(Button)`
  margin: 0 10px;
`;
