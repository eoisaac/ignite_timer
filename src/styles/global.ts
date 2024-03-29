import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:focus {
		outline: 0;
		box-shadow: 0 0 0 1px ${(props) => props.theme['green-500']};
	}

	body {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 1rem;
		-webkit-font-smoothing: antialiased;
		color: ${(props) => props.theme.white};
		background-color: ${(props) => props.theme['gray-900']};
	}

	::selection {
		color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme['green-500']};
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${(props) => props.theme['gray-600']};
  }
`
