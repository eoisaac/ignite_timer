import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: inline-flex;
    gap: 0.5rem;
  }

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme['gray-400']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &.active {
      color: ${(props) => props.theme.white};
      border-bottom-color: ${(props) => props.theme['green-500']};
    }

    &:hover {
      color: ${(props) => props.theme['gray-300']};
    }

    &:hover,
    &.active:hover {
      border-bottom-color: ${(props) => props.theme['green-300']};
    }
  }
`
