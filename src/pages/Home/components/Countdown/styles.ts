import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background-color: ${(props) => props.theme['gray-700']};
  }
`

export const CountdownSeparator = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 0 2rem;
  color: ${(props) => props.theme['green-500']};
`
