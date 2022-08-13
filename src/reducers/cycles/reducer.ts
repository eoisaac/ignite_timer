import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.INTERRUPT_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          return cycle.id === state.activeCycleId
            ? { ...cycle, interruptDate: new Date() }
            : cycle
        }),
        activeCycleId: null,
      }

    case ActionTypes.SET_ACTIVE_CYCLE_AS_FINISHED:
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
}
