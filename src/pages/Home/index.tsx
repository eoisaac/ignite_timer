import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import {
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  MinutesAmoutInput,
  StartCountdownButton,
  InterruptCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 5 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  useEffect(() => {
    let countdown: number

    if (activeCycle) {
      countdown = setInterval(() => {
        setPassedSecondsAmount(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [activeCycle])

  const handleCreateNewCycle = (data: NewCycleFormData) => {
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

    reset()
  }

  const handleInterruptCycle = () => {
    setCycles(
      cycles.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, interruptDate: new Date() }
          : cycle
      }),
    )

    setActiveCycleId(null)
  }

  const totalSecondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSecondsAmount = activeCycle
    ? totalSecondsAmount - passedSecondsAmount
    : 0

  const minutesAmount = Math.floor(currentSecondsAmount / 60)
  const secondsAmount = currentSecondsAmount % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
            list="taks-suggestions"
            {...register('task')}
          />

          <datalist id="taks-suggestions">
            <option value="Task Suggestion">Task Suggestion</option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmoutInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>

          <CountdownSeparator>:</CountdownSeparator>

          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <InterruptCountdownButton
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </InterruptCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
