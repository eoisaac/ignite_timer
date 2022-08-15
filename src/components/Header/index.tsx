import { Timer, Scroll } from 'phosphor-react'
import { HeaderContainer } from './styles'
import logo from '../../assets/images/logo.svg'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/historico" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
