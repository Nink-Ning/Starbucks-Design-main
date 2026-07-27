import type { App } from 'vue';
import * as StarbucksUI from '@sbux/starbucks-design-vue';

// 镜像旧 VitePress 站 enhanceApp:全量注册 + A 前缀别名,
// 使存量 .vue demo(不含 import)可直接迁移。
export default (app: App) => {
  for (const [key, component] of Object.entries(StarbucksUI)) {
    if (key !== 'default' && typeof component === 'object' && component !== null) {
      app.component(key, component as any);
      app.component('A' + key, component as any);
    }
  }
};
