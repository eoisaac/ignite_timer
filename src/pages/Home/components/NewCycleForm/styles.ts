import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: clamp(1rem, 2vw, 1.125rem);
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
