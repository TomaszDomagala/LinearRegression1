import styled from 'styled-components'

export const Button = styled.button`
  /* Adapt the colours based on primary prop */
  
  background: transparent;
  color: #212121;

  font-size: 1em;
  margin: 0;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid #212121;
  
  transition: all 200ms ease-out;
  &:active{
      color: white;
      background: #C2185B;
      border-color: #C2185B;
      transition: none;
  }
  &:focus{
      outline: none;
  }
`;
