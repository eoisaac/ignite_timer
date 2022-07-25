import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  margin-top: 2rem;
  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      padding: 1rem;
      line-height: 1.6;
      text-align: left;
      font-size: 0.875rem;
      color: ${(props) => props.theme['gray-100']};
      background-color: ${(props) => props.theme['gray-600']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      padding: 1rem;
      line-height: 1.6;
      font-size: 0.875rem;
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      background-color: ${(props) => props.theme['gray-700']};

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
