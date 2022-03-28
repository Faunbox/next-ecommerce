import { Button } from "@nextui-org/react";
import styled from "styled-components";

///Phone Menu
export const StyledPhoneWrapper = styled.div`
  position: relative;
  text-align: center;
`;
export const StyledPhoneMenuIconsList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;
export const StyledPhoneMenu = styled.section`
  position: sticky;
  background-color: white;
  margin: 15px 0;
  text-align: center;
`;
export const StyledPhoneMenuOptionsList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 1.2rem;
`;
export const StyledPhoneNavIcon = styled.button`
  margin: 0 15px;
  border: none;
  background-color: transparent;
`;
export const StyledInput = styled.input`
  height: 24px;
  width: auto;
`;

export const StyledSearchButton = styled(Button)`
  margin-left: 10px;
`;

export const StyledUserWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
`;

export const StyledUserButtons = styled(Button)`
  margin: 0 10px;
`;
