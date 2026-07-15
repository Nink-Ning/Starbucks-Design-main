import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { EnhanceAppContext } from 'vitepress'
import * as StarbucksUI from '@sbux/starbucks-design-vue'
import '@sbux/starbucks-design-vue/src/theme.css'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    // Register vitepress-demo-preview container
    app.component('demo-preview', AntDesignContainer)

    // Register all library components globally so they work in demos without imports
    for (const [key, component] of Object.entries(StarbucksUI)) {
      if (key !== 'default' && typeof component === 'object' && component !== null) {
        app.component(key, component as any)
        // Register A-prefixed alias for Arco Design compatibility
        app.component('A' + key, component as any)
      }
    }
  }
}
