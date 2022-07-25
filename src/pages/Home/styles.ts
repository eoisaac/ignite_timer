import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
`

const baseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;
  font-size: inherit;
  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  background: transparent;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme['green-300']};
  }
`

export const TaskInput = styled(baseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmoutInput = styled(baseInput)`
  width: 4rem;
`

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
export const StartCountdownButton = styled.button`
  border: none;
  padding: 1rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-300']};
  }
`
