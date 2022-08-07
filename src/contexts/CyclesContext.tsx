import React, { createContext, ReactNode, useState, useReducer } from 'react'

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log(state)
    console.log(action)

    if (action.type === 'CREATE_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0)

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const setPassedSeconds = (seconds: number) => {
    setPassedSecondsAmount(seconds)
  }

  const setActiveCycleAsFinished = () => {
    dispatch({
      type: 'SET_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })

    // setCycles((prevState) => {
    //   return prevState.map((cycle) => {
    //     return cycle.id === activeCycleId
    //       ? { ...cycle, interruptDate: new Date() }
    //       : cycle
    //   })
    // })
  }

  const createNewCycle = (data: createNewCycleData) => {
    const newCycleId = String(Date.now())
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    // setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(newCycleId)
    setPassedSecondsAmount(0)
  }

  const interruptActiveCycle = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

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
