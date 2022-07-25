// import {} from './styles'

import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  MinutesAmoutInput,
  StartCountdownButton,
  TaskInput,
} from './styles'

export const Home = () => {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto"
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmoutInput
            type="numebr"
            id="minutesAmount"
            placeholder="00"
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <CountdownSeparator>:</CountdownSeparator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
