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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }

        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              return cycle.id === state.activeCycleId
                ? { ...cycle, interruptDate: new Date() }
                : cycle
            }),
            activeCycleId: null,
          }

        case 'CREATSET_CURRENT_CYCLE_AS_FINISHEDE_NEW_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              return cycle.id === state.activeCycleId
                ? { ...cycle, finishedDate: new Date() }
                : cycle
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    { cycles: [], activeCycleId: null },
  )

  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0)

  const { cycles, activeCycleId } = cyclesState

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

    setPassedSecondsAmount(0)
  }

  const interruptActiveCycle = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
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
