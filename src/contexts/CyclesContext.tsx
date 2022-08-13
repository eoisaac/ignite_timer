import React, {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  createNewCycleAction,
  interruptActiveCycleAction,
  setActiveCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedCyclesStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      return storedCyclesStateAsJSON
        ? JSON.parse(storedCyclesStateAsJSON)
        : { cycles: [], activeCycleId: null }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const [passedSecondsAmount, setPassedSecondsAmount] = useState(() => {
    return activeCycle
      ? differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      : 0
  })

  useEffect(() => {
    const cyclesStateAsJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cyclesStateAsJSON)
  }, [cyclesState])

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
