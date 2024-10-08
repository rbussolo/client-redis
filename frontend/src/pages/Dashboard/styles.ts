import { styled } from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;


export const DashboardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem;

  height: 4rem;

  background-color: ${props => props.theme['gray-700']};
`

export const DashboardBody = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;

  max-height: calc(100vh - 4rem - 5.875rem);
  overflow-y: auto;

  flex: 1;
`

export const DashboardRow = styled.div`
  border-radius: 0px;
  border: 1px solid ${props => props.theme['gray-400']};
  background-color: ${props => props.theme['gray-500']};

  display: flex;
  align-items: center;
  gap: 1px;
`;

interface TextType {
  type: 'header' | 'body';
}

export const DashboardText = styled.div<TextType>`
  border-radius: 0px;
  border: 1px solid ${props => props.theme['gray-200']};
  
  background-color: ${props => {
    if (props.type === 'header') return props.theme['gray-600']
    
    return props.theme['gray-100'];
  }};

  color: ${props => {
    if (props.type === 'header') return props.theme['gray-100']

    return 'inherit';
  }};

  height: 3rem;
  overflow: hidden;
  
  padding: 0.5rem;

  position: relative;

  &:hover button {
    display: block;
  }
`;

export const DashboardTextIcon = styled.button`
  border-radius: 8px;
  border: none;

  position: absolute;

  top: 0;
  right: 0;

  height: 1.5rem;
  width: 1.5rem;

  opacity: 0.6;

  display: none;

  color: ${props => props.theme['gray-100']};
  background-color: ${props => props.theme['blue-300']};

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const DashboardFooter = styled.form`
  border-top: 1px solid ${props => props.theme['gray-500']};
  background-color: ${props => props.theme['gray-300']};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  height: 5.875rem;

  padding: 1rem;
`

interface ButtonIconProps {
  buttoncolor: 'gray' | 'blue' | 'red' | 'green';
}

export const ButtonIcon = styled.button<ButtonIconProps>`
  height: 3rem;
  width: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 8px;
  color: ${props => props.theme['gray-100']};
  background-color: ${props => {
    if (props.buttoncolor === 'gray') return props.theme['gray-300']
    if (props.buttoncolor === 'blue') return props.theme['blue-300']
    if (props.buttoncolor === 'red') return props.theme['red-300']
    if (props.buttoncolor === 'green') return props.theme['green-300']
  }};

  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => {
      if (props.buttoncolor === 'gray') return props.theme['gray-500']
      if (props.buttoncolor === 'blue') return props.theme['blue-500']
      if (props.buttoncolor === 'red') return props.theme['red-500']
      if (props.buttoncolor === 'green') return props.theme['green-500']
    }};
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    border: 1px solid ${props => props.theme['gray-300']};
    border-radius: 8px;

    padding: 0.5rem;
  }
`