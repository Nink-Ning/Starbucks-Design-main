// UMD 专用聚合入口:主入口平铺,pro 挂 .pro 命名空间(Arco 也导出 PageHeader,避免星导出冲突)
import * as pro from './pro'

export * from './index'
export { pro }
