// UMD 专用聚合入口:主入口(Arco 再导出 + 主题)平铺,pro 组件挂 .pro 命名空间。
// 不能 `export * from './pro'`:Arco 也导出 PageHeader,星导出冲突会被 rollup 静默丢弃。
import * as pro from './pro'

export * from './index'
export { pro }
