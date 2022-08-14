import styled from 'styled-components'

export const CountdownContainer = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  gap: 1rem;
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(1.5rem, 8vw, 10rem);
  line-height: 100%;
  color: ${(props) => props.theme['gray-100']};

  span {
    padding: 1.5rem clamp(0.5rem, 5vw, 1rem);
    border-radius: 8px;
    background-color: ${(props) => props.theme['gray-700']};
  }
`

export const CountdownSeparator = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 1rem 0;
  color: ${(props) => props.theme['green-500']};
`
