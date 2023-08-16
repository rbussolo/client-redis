import { styled } from 'styled-components';

export const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${props => props.theme['gray-500-opacity-50']};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlertContent = styled.div`
  width: 30rem;
  padding: 1rem;
  min-height: 15rem;

  border-radius: 8px;
  border: 1px solid ${props => props.theme['gray-300']};
  background-color: ${props => props.theme['gray-100']};

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AlertTitle = styled.div`
  display: flex;
  justify-content: center;
`

export const AlertBody = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`

export const ConfirmButton = styled.button`
  width: 100%;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 8px;

  color: #fff;
  background-color: ${props => props.theme['red-500']};
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme['red-700']};
  }
`