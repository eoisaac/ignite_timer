import { useContext } from 'react'
import { differenceInMinutes, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CyclesContext } from '../../contexts/CyclesContext'
import {
  HeaderRow,
  HeaderStats,
  HistoryContainer,
  HistoryHeader,
  HistoryList,
  Status,
} from './styles'
import { Trash } from 'phosphor-react'

export const History = () => {
  const { cycles, clearCyclesHistory } = useContext(CyclesContext)

  const minutesAmount = cycles.reduce((minutes, cycle) => {
    if (cycle.interruptDate) {
      return (minutes += differenceInMinutes(
        new Date(cycle.interruptDate),
        new Date(cycle.startDate),
      ))
    }

    if (cycle.finishedDate) {
      return (minutes += differenceInMinutes(
        new Date(cycle.finishedDate),
        new Date(cycle.startDate),
      ))
    }

    return (minutes += 0)
  }, 0)

  return (
    <HistoryContainer>
      <HistoryHeader>
        <h1>Meu Histórico</h1>
        <HeaderRow>
          <HeaderStats>
            <div>
              Total de tarefas:
              <span>{` ${String(cycles.length).padStart(2, '0')}`}</span>
            </div>
            <div>
              Total de minutos:
              <span>{` ${String(minutesAmount).padStart(2, '0')}`}</span>
            </div>
          </HeaderStats>

          <button onClick={clearCyclesHistory} title="Limpar histórico">
            <Trash size={24} />
          </button>
        </HeaderRow>
      </HistoryHeader>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interruptDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
