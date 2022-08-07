import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountdownContainer, CountdownSeparator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    passedSecondsAmount,
    setActiveCycleAsFinished,
    setPassedSeconds,
  } = useContext(CyclesContext)

  const totalSecondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let countdown: number

    if (activeCycle) {
      countdown = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference > totalSecondsAmount) {
          setActiveCycleAsFinished()
          setPassedSeconds(totalSecondsAmount)
          clearInterval(countdown)
        } else {
          setPassedSeconds(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [
    activeCycle,
    totalSecondsAmount,
    activeCycleId,
    setActiveCycleAsFinished,
    setPassedSeconds,
  ])

  const currentSecondsAmount = activeCycle
    ? totalSecondsAmount - passedSecondsAmount
    : 0

  const minutesAmount = Math.floor(currentSecondsAmount / 60)
  const secondsAmount = currentSecondsAmount % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    document.title = activeCycle ? `${minutes}:${seconds}` : 'Ignite Timer'
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <CountdownSeparator>:</CountdownSeparator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
