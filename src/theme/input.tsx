import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle
} from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
})

const variantOutline = definePartsStyle(props => {
  return {
    field: {
      fontFamily: 'mono'
    }
  }
})

const variantFilled = definePartsStyle(props => {
  return {
    field: {
      fontWeight: 'semibold'
    }
  }
})

const variants = {
  outline: variantOutline,
  filled: variantFilled
}

const size = {
  md: defineStyle({
    fontSize: 'sm',
    px: '4',
    h: '10',
    borderRadius: 'none'
  })
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    addon: size.md
  })
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
})
