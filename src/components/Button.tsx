import { ButtonContainer, ButtonVariant } from './Button.styles'

interface Props {
  variant: ButtonVariant
}

export const Button = ({ variant = 'primary' }: Props) => {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
