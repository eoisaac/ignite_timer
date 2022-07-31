import React, { createContext, ReactNode, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface createNewCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  passedSecondsAmount: number
  setActiveCycleAsFinished: () => void
  setPassedSeconds: (seconds: number) => void
  createNewCycle: (data: createNewCycleData) => void
  interruptActiveCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0)

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const setPassedSeconds = (seconds: number) => {
    setPassedSecondsAmount(seconds)
  }

  const setActiveCycleAsFinished = () => {
    setCycles((prevState) => {
      return prevState.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, interruptDate: new Date() }
          : cycle
      })
    })
  }

  const createNewCycle = (data: createNewCycleData) => {
    const newCycleId = String(Date.now())
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(newCycleId)
    setPassedSecondsAmount(0)
    // reset()
  }

  const interruptActiveCycle = () => {
    setActiveCycleAsFinished()
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        passedSecondsAmount,
        setActiveCycleAsFinished,
        setPassedSeconds,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
