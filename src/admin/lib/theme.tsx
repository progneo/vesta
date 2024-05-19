import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

type Props = {
  colorMode: string
}

const styles = {
  global: (props: Props) => ({
    body: {
      bg: mode('#ffffff', '#1F1D2B')(props)
    }
  })
}

const components = {}

const colors = {
  accentGreen: {
    50: '#f7faf0',
    100: '#eaf3d3',
    200: '#dcebb6',
    300: '#cfe39a',
    400: '#c1db7d',
    500: '#b4d360',
    600: '#a6cb43',
    700: '#99c326',
    800: '#8bb909',
    900: '#7ea900'
  }
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  styles,
  components,
  colors
})

export default theme
