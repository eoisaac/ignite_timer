import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  max-width: 74rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 1rem;

  nav {
    display: inline-flex;
    gap: 0.5rem;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
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
