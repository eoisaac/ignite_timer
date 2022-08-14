import styled from 'styled-components'

export const HomeContainer = styled.main`
  width: 100%;
  max-width: 74rem;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0 auto;
  overflow-y: auto;

  form {
    width: 100%;
    max-width: 40rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`
export const BaseCountdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-300']};
  }
`

export const InterruptCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
