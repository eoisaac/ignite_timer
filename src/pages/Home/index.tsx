// import {} from './styles'

import { Play } from 'phosphor-react'
import { CountdownContainer, CountdownSeparator, FormContainer, HomeContainer } from './styles'

export const Home = () => {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input type="text" id="task" />

          <label htmlFor="minutesAmount">durante</label>
          <input type="numebr" id="minutesAmount" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <CountdownSeparator>:</CountdownSeparator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
