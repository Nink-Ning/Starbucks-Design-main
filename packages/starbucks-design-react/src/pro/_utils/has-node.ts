import type { ReactNode } from 'react'

/** React 不渲染布尔值:false/null/undefined 均视为"无内容" */
export function hasNode(node: ReactNode): boolean {
  return node != null && typeof node !== 'boolean'
}
