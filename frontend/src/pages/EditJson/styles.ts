import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  padding: 0.5rem;

  height: 4rem;

  background-color: ${props => props.theme['gray-700']};

  span {
    height: 3rem;

    padding-left: 10px;
    padding-right: 10px;

    font-size: 1.5rem;

    display: flex;
    align-items: center;

    border: none;
    border-radius: 8px;
    color: ${props => props.theme['gray-700']};

    background-color: ${props => props.theme['gray-300']};
  }
`

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const Body = styled.div`
  flex-grow: 1;

  display: flex;
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