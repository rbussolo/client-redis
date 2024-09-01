import styled from 'styled-components';

export const ConnectionContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  background-color: ${props => props.theme['gray-400']};
`

export const ConnectionContent = styled.form`
  width: 30rem;
  padding: 1rem;

  border-radius: 8px;
  border: 1px solid ${props => props.theme['gray-300']};
  background-color: ${props => props.theme['gray-100']};

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const DivRow = styled.div`
  display: flex;
  gap: 1rem;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input, select {
    border: 1px solid ${props => props.theme['gray-300']};
    border-radius: 8px;

    padding: 0.5rem;
  }

  select {
    flex-grow: 1;
    font-size: 1rem;
  }

  div {
    display: flex;
    gap: 0.5rem;
  }
`

export const EditButton = styled.button`
  padding-left: 5px;
  padding-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 8px;

  color: #fff;
  background-color: ${props => props.theme['green-500']};
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme['green-700']};
  }
`

export const DeleteButton = styled.button`
  padding-left: 5px;
  padding-right: 5px;

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

export const ConfirmButton = styled.button`
  width: 100%;

  height: 3rem;

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