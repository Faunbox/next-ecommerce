import styled from "styled-components";
import Link from "next/link";

export const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  padding-bottom: 2rem;
  background-color: #eee;
  opacity: 0.9;
`;

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
  margin: 10px;
`;

export const StyledLink = styled(Link)`
  margin: 0 5px;
`;
export const StyledText = styled.p`
  margin: 0 10px;
`;
export const StyledSocialsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
`;
