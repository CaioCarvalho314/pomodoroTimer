import { styled } from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 1.0556rem;
  color: ${(props) => props.theme["gray-100"]};

  input {
    width: 25%;
    display: inline;
    background: transparent;
    font-weight: 600;
    font-size: 1.0556rem;
    border-bottom: 3px solid ${(props) => props.theme["gray-500"]};
  }
`;
