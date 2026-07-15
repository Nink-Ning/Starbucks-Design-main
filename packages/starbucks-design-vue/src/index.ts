// Order matters: components.less includes Arco's css-variables (loaded first),
// then theme.css overrides with Figma values (loaded second, wins in cascade).
import './components.less'
import './theme.css'

import { defineComponent, h } from 'vue'
import { Select as ArcoSelect } from '@arco-design/web-vue'

export * from '@arco-design/web-vue'

const StarbucksSelectBase = defineComponent({
  name: 'Select',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const nextAttrs =
        attrs.mode === 'multiple' && attrs.maxTagCount === undefined
          ? { ...attrs, maxTagCount: { count: 1, render: (invisibleCount: number) => `+${invisibleCount}` } }
          : attrs

      return h(ArcoSelect as any, nextAttrs, slots)
    }
  },
})

export const Select = Object.assign(StarbucksSelectBase, {
  Option: (ArcoSelect as any).Option,
  OptGroup: (ArcoSelect as any).OptGroup,
})

// Arco's main entry only re-exports addI18nMessages, useLocale, getLocale from locale —
// useI18n and the locale types (ArcoLang, ArcoI18nMessages, etc.) are missing.
// Re-export everything from locale/* so consumers get the full i18n surface.
export * from '@arco-design/web-vue/es/locale'
export type * from '@arco-design/web-vue/es/locale/interface'

// Locale language objects (zhCN, enUS, etc.) are NOT re-exported here —
// they are default exports from individual lang files and export * won't pick
// them up. Consumers should deep-import them, same pattern as icons:
//   import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
