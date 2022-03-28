import { Button } from "@nextui-org/react";
import { Card, DropdownButton } from "react-bootstrap";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  @media (min-width: 413px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const StyledStoreForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledAddItemButton = styled(Button)`
  margin-bottom: 10px;
`;

export const StyledDropdownButton = styled(DropdownButton)`
  margin: 10px;
`;

//Cart elements
export const StyledCard = styled(Card)`
  margin: 15px 0;
  @media (min-width: 414px) {
    margin: 0 15px;
  }
`;
export const StyledCardTitle = styled(Card.Title)`
  font-weight: bold;
`;
