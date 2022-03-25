import styled from "styled-components";
import Link from "next/link";

export const StyledSection = styled.section`
  display: flex;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  margin: 30px 0;
  overflow: hidden;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  align-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const StyledLink = styled(Link)`
  margin: 0 5px;
`;
export const StyledText = styled.p`
  margin: 0;
`;
export const StyledSocialsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  margin: 2rem 0;
`;
