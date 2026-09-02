export interface TagGroupItem {
  id: string
  name: string
  disabled?: boolean
  allowRename?: boolean
  allowDelete?: boolean
  deleteDisabledReason?: string
}

export interface TagGroupContentContext {
  activeGroupId: string | null
  activeGroup: TagGroupItem | null
}

export interface TagGroupEmptyContext {
  type: 'empty' | 'searchEmpty'
  keyword: string
}

export interface TagGroupManagementTexts {
  title: string
  searchPlaceholder: string
  create: string
  rename: string
  confirm: string
  cancel: string
  empty: string
  searchEmpty: string
  nameRequired: string
  nameDuplicate: string
  nameTooLong: string
}

export interface TagGroupDeleteConfirmOptions {
  title?: string
  content?: string
  okText?: string
  cancelText?: string
}

export type TagGroupDeleteConfirm =
  | TagGroupDeleteConfirmOptions
  | ((group: TagGroupItem) => TagGroupDeleteConfirmOptions)

export type TagGroupEventSource = 'itemClick' | 'keyboard' | 'groupsUpdateFallback' | 'search'

export interface TagGroupEventMeta {
  source: TagGroupEventSource
  groupId?: string | null
  keyword?: string
}

export interface TagGroupManagementProps {
  groups: readonly TagGroupItem[]
  activeGroupId?: string | null
  defaultActiveGroupId?: string | null
  searchable?: boolean
  loading?: boolean
  disabled?: boolean
  allowCreate?: boolean
  allowRename?: boolean
  allowDelete?: boolean
  deleteConfirm?: TagGroupDeleteConfirm
  texts?: Partial<TagGroupManagementTexts>
}

export interface TagGroupManagementEmits {
  'update:activeGroupId': [groupId: string | null]
  activeGroupChange: [groupId: string | null, meta: TagGroupEventMeta]
  searchChange: [keyword: string, meta: TagGroupEventMeta]
  createGroup: [name: string, meta: TagGroupEventMeta]
  renameGroup: [groupId: string, name: string, meta: TagGroupEventMeta]
  deleteGroup: [groupId: string, meta: TagGroupEventMeta]
}

export interface TagGroupContentSlotContext extends TagGroupContentContext {}

export interface TagGroupEmptySlotContext extends TagGroupEmptyContext {}
