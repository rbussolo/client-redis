import styled from 'styled-components';

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  
  width: 100vw;
  height: 100vh;

  background-color: ${props => props.theme['gray-500-opacity-50']};

  display: flex;
  align-items: center;
  justify-content: center;
`