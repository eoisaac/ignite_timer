import { Cycle } from './reducer'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  SET_ACTIVE_CYCLE_AS_FINISHED = 'SET_ACTIVE_CYCLE_AS_FINISHED',
}

export const createNewCycleAction = (newCycle: Cycle) => {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export const interruptActiveCycleAction = () => {
  return {
    type: ActionTypes.INTERRUPT_ACTIVE_CYCLE,
  }
}

export const setActiveCycleAsFinishedAction = () => {
  return {
    type: ActionTypes.SET_ACTIVE_CYCLE_AS_FINISHED,
  }
}
