import React, { createContext, ReactNode, useState, useReducer } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  createNewCycleAction,
  interruptActiveCycleAction,
  setActiveCycleAsFinishedAction,
} from '../reducers/cycles/actions'

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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const setPassedSeconds = (seconds: number) => {
    setPassedSecondsAmount(seconds)
  }

  const setActiveCycleAsFinished = () => {
    dispatch(setActiveCycleAsFinishedAction())
  }

  const createNewCycle = (data: createNewCycleData) => {
    const newCycleId = String(Date.now())
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
    setPassedSecondsAmount(0)
  }

  const interruptActiveCycle = () => {
    dispatch(interruptActiveCycleAction())
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
