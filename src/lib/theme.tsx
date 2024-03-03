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

const colors = {}

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
