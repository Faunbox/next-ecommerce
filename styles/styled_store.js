import { Button } from "@nextui-org/react";
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
