import type { TagGroupEventMeta, TagGroupEventSource, TagGroupItem } from './interface'

export type InitialResolution = 'pending' | 'resolved'

export interface DuplicateTagGroupId {
  id: string
  indexes: number[]
}

export interface EffectiveGroupsResult {
  effectiveGroups: TagGroupItem[]
  duplicates: DuplicateTagGroupId[]
  duplicateKey: string
}

export interface InitialSelectionState {
  initialResolution: InitialResolution
  activeGroupId: string | null
}

export interface ResolveGroupsFallbackResult {
  activeGroupId: string | null
  changed: boolean
}

export const deriveEffectiveGroups = (groups: readonly TagGroupItem[]): EffectiveGroupsResult => {
  const firstIndexes = new Map<string, number>()
  const duplicateIndexes = new Map<string, number[]>()
  const effectiveGroups: TagGroupItem[] = []

  groups.forEach((group, index) => {
    if (!firstIndexes.has(group.id)) {
      firstIndexes.set(group.id, index)
      effectiveGroups.push(group)
      return
    }

    const indexes = duplicateIndexes.get(group.id) ?? [firstIndexes.get(group.id) as number]
    indexes.push(index)
    duplicateIndexes.set(group.id, indexes)
  })

  const duplicates = Array.from(duplicateIndexes, ([id, indexes]) => ({ id, indexes }))
  const duplicateKey = duplicates.map(({ id, indexes }) => `${id}:${indexes.join(',')}`).join('|')

  return { effectiveGroups, duplicates, duplicateKey }
}

const getEnabledGroups = (groups: readonly TagGroupItem[]): TagGroupItem[] => groups.filter((group) => !group.disabled)

export const isActiveGroupControlled = (activeGroupId: string | null | undefined): boolean =>
  activeGroupId !== undefined

const resolveInitialActiveGroupIdState = (
  groups: readonly TagGroupItem[],
  options: {
    loading: boolean
    initialResolution: InitialResolution
    activeGroupId: string | null
    defaultActiveGroupId?: string | null
  }
): InitialSelectionState => {
  if (options.initialResolution === 'resolved' || options.loading) {
    return {
      initialResolution: options.initialResolution,
      activeGroupId: options.activeGroupId
    }
  }

  const effectiveGroups = deriveEffectiveGroups(groups).effectiveGroups
  const selectableGroups = getEnabledGroups(effectiveGroups)
  let activeGroupId: string | null = null

  if (options.defaultActiveGroupId === null) {
    activeGroupId = null
  } else if (
    options.defaultActiveGroupId !== undefined &&
    selectableGroups.some((group) => group.id === options.defaultActiveGroupId)
  ) {
    activeGroupId = options.defaultActiveGroupId
  } else {
    activeGroupId = selectableGroups[0]?.id ?? null
  }

  return { initialResolution: 'resolved', activeGroupId }
}

export const resolveInitialActiveGroupId = (
  groups: readonly TagGroupItem[],
  options: {
    loading: boolean
    initialResolution: InitialResolution
    activeGroupId: string | null
    defaultActiveGroupId?: string | null
  }
): string | null => resolveInitialActiveGroupIdState(groups, options).activeGroupId

export const deriveActiveGroup = (
  groups: readonly TagGroupItem[],
  activeGroupId: string | null
): TagGroupItem | null => {
  if (activeGroupId === null) {
    return null
  }

  return deriveEffectiveGroups(groups).effectiveGroups.find((group) => group.id === activeGroupId) ?? null
}

export const resolveGroupsUpdateFallback = (
  previousGroups: readonly TagGroupItem[],
  nextGroups: readonly TagGroupItem[],
  activeGroupId: string | null
): ResolveGroupsFallbackResult => {
  if (activeGroupId === null) {
    return { activeGroupId: null, changed: false }
  }

  const previousEffectiveGroups = deriveEffectiveGroups(previousGroups).effectiveGroups
  const nextEffectiveGroups = deriveEffectiveGroups(nextGroups).effectiveGroups

  const nextActiveGroup = nextEffectiveGroups.find((group) => group.id === activeGroupId)
  if (nextActiveGroup) {
    return { activeGroupId, changed: false }
  }

  const previousIndex = previousEffectiveGroups.findIndex((group) => group.id === activeGroupId)
  if (previousIndex < 0) {
    return { activeGroupId, changed: false }
  }

  for (let index = previousIndex; index < nextEffectiveGroups.length; index += 1) {
    if (!nextEffectiveGroups[index].disabled) {
      return { activeGroupId: nextEffectiveGroups[index].id, changed: true }
    }
  }

  for (let index = Math.min(previousIndex - 1, nextEffectiveGroups.length - 1); index >= 0; index -= 1) {
    if (!nextEffectiveGroups[index].disabled) {
      return { activeGroupId: nextEffectiveGroups[index].id, changed: true }
    }
  }

  return { activeGroupId: null, changed: true }
}

export type GroupNavigationKey = 'ArrowUp' | 'ArrowDown' | 'Home' | 'End'

export const resolveKeyboardFocusTarget = (
  groups: readonly TagGroupItem[],
  currentGroupId: string | null,
  key: GroupNavigationKey
): string | null => {
  const selectableGroups = getEnabledGroups(groups)
  if (selectableGroups.length === 0) {
    return null
  }

  if (key === 'Home') {
    return selectableGroups[0].id
  }
  if (key === 'End') {
    return selectableGroups[selectableGroups.length - 1].id
  }

  const currentIndex = selectableGroups.findIndex((group) => group.id === currentGroupId)
  if (currentIndex < 0) {
    return key === 'ArrowUp' ? selectableGroups[selectableGroups.length - 1].id : selectableGroups[0].id
  }

  const nextIndex = key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1
  return selectableGroups[Math.max(0, Math.min(nextIndex, selectableGroups.length - 1))].id
}

export const getNavigableGroupIds = (groups: readonly TagGroupItem[]): string[] =>
  getEnabledGroups(groups).map((group) => group.id)

export const createTagGroupEventMeta = (
  source: TagGroupEventSource,
  options: { groupId?: string | null; keyword?: string } = {}
): TagGroupEventMeta => ({
  source,
  ...(options.groupId !== undefined ? { groupId: options.groupId } : {}),
  ...(options.keyword !== undefined ? { keyword: options.keyword } : {})
})

export const isGroupActivationKey = (key: string): boolean => key === 'Enter' || key === ' '
