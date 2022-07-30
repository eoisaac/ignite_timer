import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  InterruptCountdownButton,
} from './styles'
// import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  setActiveCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const setActiveCycleAsFinished = () => {
    setCycles((prevState) => {
      return prevState.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, interruptDate: new Date() }
          : cycle
      })
    })
  }

  // const handleCreateNewCycle = (data: NewCycleFormData) => {
  //   const newCycleId = String(Date.now())
  //   const newCycle: Cycle = {
  //     id: newCycleId,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((prevState) => [...prevState, newCycle])
  //   setActiveCycleId(newCycleId)
  //   setPassedSecondsAmount(0)

  //   reset()
  // }

  const handleInterruptCycle = () => {
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, setActiveCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <InterruptCountdownButton
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </InterruptCountdownButton>
        ) : (
          <StartCountdownButton type="submit" /* disabled={isSubmitDisabled} */>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
