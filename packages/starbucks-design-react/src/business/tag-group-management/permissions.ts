import type { TagGroupItem } from './interface'

export interface TagGroupOperationPermission {
  visible: boolean
  disabled: boolean
  disabledReason?: string
}

export interface TagGroupPermissions {
  create: TagGroupOperationPermission
  rename: TagGroupOperationPermission
  delete: TagGroupOperationPermission
}

export interface TagGroupPermissionOptions {
  loading?: boolean
  disabled?: boolean
  allowCreate?: boolean
  allowRename?: boolean
  allowDelete?: boolean
}

export const resolveGroupPermissions = (
  group: TagGroupItem | null,
  options: TagGroupPermissionOptions = {}
): TagGroupPermissions => {
  const blocked = Boolean(options.loading || options.disabled)
  const groupBlocked = blocked || Boolean(group?.disabled)
  const canCreate = options.allowCreate !== false
  const canRename = options.allowRename !== false && group !== null && group.allowRename !== false
  const canDelete = options.allowDelete !== false && group !== null
  const deleteDisabledByItem = group?.allowDelete === false

  return {
    create: {
      visible: canCreate,
      disabled: blocked
    },
    rename: {
      visible: canRename && !group?.disabled,
      disabled: groupBlocked
    },
    delete: {
      visible: canDelete,
      disabled: groupBlocked || Boolean(deleteDisabledByItem),
      disabledReason: deleteDisabledByItem ? group?.deleteDisabledReason : undefined
    }
  }
}

export const resolveCanCreate = (options: TagGroupPermissionOptions = {}): boolean => {
  const permission = resolveGroupPermissions(null, options).create
  return permission.visible && !permission.disabled
}
