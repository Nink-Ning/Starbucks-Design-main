export interface TagGroupDemoItem {
  id: string
  name: string
  disabled?: boolean
  allowRename?: boolean
  allowDelete?: boolean
  deleteDisabledReason?: string
}

export interface TagRecord {
  name: string
  status: '启用' | '停用'
  updatedAt: string
}

export const demoGroups: TagGroupDemoItem[] = [
  { id: 'store', name: '门店标签' },
  { id: 'product', name: '商品标签' },
  { id: 'member', name: '会员标签' },
  { id: 'marketing', name: '营销活动' },
  { id: 'regional', name: '华东区域重点门店运营观察标签组' },
  {
    id: 'archived',
    name: '已归档',
    disabled: true,
    allowRename: false,
    allowDelete: false,
    deleteDisabledReason: '系统预置标签组不可删除'
  }
]

export const demoTagsByGroup: Record<string, TagRecord[]> = {
  store: [
    { name: '重点门店', status: '启用', updatedAt: '2026-07-29' },
    { name: '新店观察', status: '启用', updatedAt: '2026-07-26' },
    { name: '低客流门店', status: '停用', updatedAt: '2026-07-18' }
  ],
  product: [
    { name: '季节限定', status: '启用', updatedAt: '2026-07-28' },
    { name: '热销商品', status: '启用', updatedAt: '2026-07-24' },
    { name: '新品试饮', status: '启用', updatedAt: '2026-07-20' }
  ],
  member: [
    { name: '会员生日', status: '启用', updatedAt: '2026-07-27' },
    { name: '高价值会员', status: '启用', updatedAt: '2026-07-22' },
    { name: '沉睡会员', status: '停用', updatedAt: '2026-07-16' }
  ],
  marketing: [
    { name: '夏日促销', status: '启用', updatedAt: '2026-07-30' },
    { name: '新品上市活动', status: '启用', updatedAt: '2026-07-25' },
    { name: '区域联名活动', status: '停用', updatedAt: '2026-07-12' }
  ],
  regional: [
    { name: '华东重点商圈', status: '启用', updatedAt: '2026-07-21' },
    { name: '上海新店', status: '启用', updatedAt: '2026-07-19' }
  ],
  archived: [{ name: '历史标签仅供查看', status: '停用', updatedAt: '2025-12-31' }]
}

export const longGroups: TagGroupDemoItem[] = Array.from({ length: 30 }, (_, index) => ({
  id: `long-${index + 1}`,
  name: `标签组 ${String(index + 1).padStart(2, '0')}${index === 12 ? ' · 长列表示例' : ''}`
}))

export const longTagRecords: TagRecord[] = Array.from({ length: 36 }, (_, index) => ({
  name: `运营标签 ${String(index + 1).padStart(2, '0')}`,
  status: index % 5 === 0 ? '停用' : '启用',
  updatedAt: `2026-07-${String(30 - (index % 20)).padStart(2, '0')}`
}))

export function getDemoTags(groupId: string): TagRecord[] {
  return (
    demoTagsByGroup[groupId] ?? [
      { name: '待补充标签', status: '启用', updatedAt: '2026-08-01' },
      { name: '示例标签', status: '启用', updatedAt: '2026-07-31' }
    ]
  )
}
