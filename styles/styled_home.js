import { Button } from "@nextui-org/react";
import styled from "styled-components";
import { Wrapper } from "./mixins";

export const StyledMain = styled.main`
  ${Wrapper}
`;

export const StyledWrapper = styled.div`
  ${Wrapper}
`;

// Basic Info component
export const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  margin: 20px 10px 0 10px;
  align-items: flex-end;
  justify-content: space-around;
  overflow: hidden;
`;
export const StyledDiv = styled.div`
  text-align: center;
  flex-basis: 33%;
`;
export const StyledButton = styled(Button)`
  margin: 20px 0;
`;

//Promotion component
export const StyledPromotionContainter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 1.5rem;
  @media (min-width: 413px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
  }
`;
export const StyledTextWrapper = styled.div`
  margin: 1.5rem;
  text-align: left;
`;
