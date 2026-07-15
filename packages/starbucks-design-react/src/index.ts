// Order matters: components.less includes Arco's css-variables (loaded first),
// then theme.css overrides with Figma values (loaded second, wins in cascade).
import './components.less'
import './theme.css'

import React, { forwardRef } from 'react'
import { Select as ArcoSelect } from '@arco-design/web-react'
import type { SelectProps } from '@arco-design/web-react'

export * from '@arco-design/web-react'

const StarbucksSelectBase = forwardRef<unknown, SelectProps>((props, ref) => {
  const nextProps =
    props.mode === 'multiple' && props.maxTagCount === undefined
      ? { ...props, maxTagCount: { count: 1, render: (invisibleCount: number) => `+${invisibleCount}` } }
      : props

  return React.createElement(ArcoSelect as React.ComponentType<any>, {
    ...nextProps,
    ref,
  })
})

StarbucksSelectBase.displayName = 'Select'

export const Select = Object.assign(StarbucksSelectBase, {
  Option: ArcoSelect.Option,
  OptGroup: ArcoSelect.OptGroup,
})

// Locale type is not exported from @arco-design/web-react's main entry,
// only from es/locale/interface. Re-export the full locale type surface
// so consumers can type-annotate locale overrides.
export type * from '@arco-design/web-react/es/locale/interface'
