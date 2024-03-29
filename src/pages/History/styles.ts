import styled from 'styled-components'

export const HistoryContainer = styled.main`
  width: 100%;
  max-width: 74rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: auto;
  border-radius: 8px;
`

export const HistoryHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const HeaderRow = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }

  button {
    line-height: 0;
    padding: 0.5rem;
    cursor: pointer;
    color: ${(props) => props.theme['gray-500']};
    border: none;
    outline: none;
    background-color: transparent;

    &:hover {
      color: ${(props) => props.theme['red-500']};
    }
  }
`

export const HeaderStats = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  color: ${(props) => props.theme['gray-500']};

  span {
    color: ${(props) => props.theme['gray-300']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  margin-top: 1rem;
  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      color: ${(props) => props.theme['gray-100']};
      background-color: ${(props) => props.theme['gray-600']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1rem;
      }
    }

    td {
      padding: 1rem;
      font-size: 0.875rem;
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      background-color: ${(props) => props.theme['gray-700']};

      &:first-child {
        width: 50%;
        padding-left: 1rem;
      }

      &:last-child {
        padding-right: 1rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
