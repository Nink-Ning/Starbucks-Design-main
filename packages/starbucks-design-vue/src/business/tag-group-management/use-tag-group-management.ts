import { computed, onBeforeUnmount, ref, watch, type ComputedRef } from 'vue'
import type {
  TagGroupDeleteConfirm,
  TagGroupEventMeta,
  TagGroupItem,
  TagGroupManagementEmits,
  TagGroupManagementProps
} from './interface'
import { resolveTagGroupManagementTexts } from './constants'
import { normalizeDisplayName, validateGroupName, type TagGroupNameError } from './normalize'
import { filterTagGroups, normalizeSearchKeyword } from './search'
import {
  createTagGroupEventMeta,
  deriveActiveGroup,
  deriveEffectiveGroups,
  isActiveGroupControlled,
  resolveGroupsUpdateFallback,
  resolveInitialActiveGroupId
} from './selection'
import { resolveCanCreate, resolveGroupPermissions } from './permissions'

export const TAG_GROUP_SEARCH_DEBOUNCE_MS = 500

export type TagGroupOperationType = 'create' | 'rename' | 'delete'

export interface TagGroupOperationState {
  type: TagGroupOperationType
  groupId: string | null
  value: string
  error?: TagGroupNameError
}

export interface UseTagGroupManagementResult {
  activeGroupId: ComputedRef<string | null>
  activeGroup: ComputedRef<TagGroupItem | null>
  effectiveGroups: ComputedRef<TagGroupItem[]>
  visibleGroups: ComputedRef<readonly TagGroupItem[]>
  duplicateIds: ComputedRef<Array<{ id: string; indexes: number[] }>>
  searchKeyword: ComputedRef<string>
  texts: ComputedRef<ReturnType<typeof resolveTagGroupManagementTexts>>
  operation: ComputedRef<TagGroupOperationState | null>
  initialResolution: ComputedRef<'pending' | 'resolved'>
  selectGroup: (groupId: string, source: 'itemClick' | 'keyboard') => void
  setSearchKeyword: (keyword: string) => void
  openCreate: () => void
  openRename: (group: TagGroupItem) => void
  openDelete: (group: TagGroupItem) => void
  setOperationValue: (value: string) => void
  submitOperation: (source: 'itemClick' | 'keyboard') => void
  confirmDelete: (source: 'itemClick' | 'keyboard') => void
  closeOperation: () => void
}

export interface TagGroupManagementEmit {
  <Event extends keyof TagGroupManagementEmits>(event: Event, ...args: TagGroupManagementEmits[Event]): void
}

const getDeleteConfirm = (deleteConfirm: TagGroupDeleteConfirm | undefined, group: TagGroupItem) => {
  if (typeof deleteConfirm === 'function') {
    return deleteConfirm(group)
  }

  return deleteConfirm ?? {}
}

export const resolveTagGroupDeleteConfirm = getDeleteConfirm

export const useTagGroupManagement = (
  props: TagGroupManagementProps,
  emit: TagGroupManagementEmit
): UseTagGroupManagementResult => {
  const loading = computed(() => Boolean(props.loading))
  const disabled = computed(() => Boolean(props.disabled))
  const searchable = computed(() => props.searchable !== false)
  const controlled = computed(() => isActiveGroupControlled(props.activeGroupId))
  const texts = computed(() => resolveTagGroupManagementTexts(props.texts))
  const effectiveResult = computed(() => deriveEffectiveGroups(props.groups))
  const initialResolution = ref<'pending' | 'resolved'>('pending')
  const internalActiveGroupId = ref<string | null>(null)
  const searchKeyword = ref('')
  const operation = ref<TagGroupOperationState | null>(null)
  const previousGroups = ref<TagGroupItem[] | null>(null)
  const warnedDuplicateKeys = new Set<string>()
  let searchTimer: ReturnType<typeof setTimeout> | null = null

  const clearSearchTimer = () => {
    if (searchTimer !== null) {
      clearTimeout(searchTimer)
      searchTimer = null
    }
  }

  const resolveInitialState = () => {
    if (controlled.value) {
      initialResolution.value = 'resolved'
      return
    }

    if (props.loading) {
      initialResolution.value = 'pending'
      return
    }

    initialResolution.value = 'resolved'
    internalActiveGroupId.value = resolveInitialActiveGroupId(effectiveResult.value.effectiveGroups, {
      loading: false,
      initialResolution: 'pending',
      activeGroupId: null,
      defaultActiveGroupId: props.defaultActiveGroupId
    })
  }

  resolveInitialState()

  const activeGroupId = computed(() => (controlled.value ? (props.activeGroupId ?? null) : internalActiveGroupId.value))
  const activeGroup = computed(() => deriveActiveGroup(effectiveResult.value.effectiveGroups, activeGroupId.value))
  const visibleGroups = computed(() =>
    searchable.value
      ? filterTagGroups(effectiveResult.value.effectiveGroups, searchKeyword.value)
      : effectiveResult.value.effectiveGroups
  )

  watch(
    () => effectiveResult.value.duplicateKey,
    (duplicateKey) => {
      if (!duplicateKey || warnedDuplicateKeys.has(duplicateKey)) {
        return
      }

      warnedDuplicateKeys.add(duplicateKey)
      const details = effectiveResult.value.duplicates
        .map(({ id, indexes }) => `${id} [${indexes.join(', ')}]`)
        .join('; ')
      const environment = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env
      if (environment?.DEV) {
        console.warn(`[TagGroupManagement] duplicate group id(s); first occurrence wins: ${details}`)
      }
    },
    { immediate: true }
  )

  watch(
    [() => props.groups, () => props.loading, controlled],
    () => {
      const nextGroups = effectiveResult.value.effectiveGroups

      if (controlled.value) {
        initialResolution.value = 'resolved'
        previousGroups.value = nextGroups
        return
      }

      if (initialResolution.value === 'pending') {
        if (!props.loading) {
          initialResolution.value = 'resolved'
          internalActiveGroupId.value = resolveInitialActiveGroupId(nextGroups, {
            loading: false,
            initialResolution: 'pending',
            activeGroupId: null,
            defaultActiveGroupId: props.defaultActiveGroupId
          })
        }
        previousGroups.value = nextGroups
        return
      }

      const oldGroups = previousGroups.value
      previousGroups.value = nextGroups
      if (!oldGroups || activeGroupId.value === null) {
        return
      }

      const fallback = resolveGroupsUpdateFallback(oldGroups, nextGroups, activeGroupId.value)
      if (fallback.changed) {
        internalActiveGroupId.value = fallback.activeGroupId
        emit('update:activeGroupId', fallback.activeGroupId)
        emit(
          'activeGroupChange',
          fallback.activeGroupId,
          createTagGroupEventMeta('groupsUpdateFallback', { groupId: fallback.activeGroupId })
        )
      }
    },
    { immediate: true }
  )

  const closeOperation = () => {
    operation.value = null
  }

  watch(
    [() => props.searchable, () => props.loading, () => props.disabled],
    ([nextSearchable, nextLoading, nextDisabled], previous) => {
      if (previous?.[0] && nextSearchable === false) {
        clearSearchTimer()
        searchKeyword.value = ''
        closeOperation()
      }

      if (nextLoading || nextDisabled) {
        clearSearchTimer()
        closeOperation()
      }
    }
  )

  watch(
    () => effectiveResult.value.effectiveGroups,
    (groups) => {
      if (operation.value?.type !== 'create' && operation.value?.groupId !== null) {
        const operationGroupExists = groups.some((group) => group.id === operation.value?.groupId)
        if (!operationGroupExists) {
          closeOperation()
        }
      }
    }
  )

  onBeforeUnmount(clearSearchTimer)

  const selectGroup = (groupId: string, source: 'itemClick' | 'keyboard') => {
    if (loading.value || disabled.value) {
      return
    }

    const group = effectiveResult.value.effectiveGroups.find((item) => item.id === groupId)
    if (!group || group.disabled || group.id === activeGroupId.value) {
      return
    }

    closeOperation()
    if (!controlled.value) {
      internalActiveGroupId.value = group.id
    }
    emit('update:activeGroupId', group.id)
    emit('activeGroupChange', group.id, createTagGroupEventMeta(source, { groupId: group.id }))
  }

  const setSearchKeyword = (keyword: string) => {
    if (!searchable.value || loading.value || disabled.value) {
      return
    }

    searchKeyword.value = keyword
    clearSearchTimer()
    closeOperation()
    searchTimer = setTimeout(() => {
      searchTimer = null
      const normalizedKeyword = normalizeSearchKeyword(keyword)
      emit('searchChange', normalizedKeyword, createTagGroupEventMeta('search', { keyword: normalizedKeyword }))
    }, TAG_GROUP_SEARCH_DEBOUNCE_MS)
  }

  const openCreate = () => {
    if (!resolveCanCreate({ loading: loading.value, disabled: disabled.value, allowCreate: props.allowCreate })) {
      return
    }
    operation.value = { type: 'create', groupId: null, value: '' }
  }

  const openRename = (group: TagGroupItem) => {
    const permission = resolveGroupPermissions(group, {
      loading: loading.value,
      disabled: disabled.value,
      allowRename: props.allowRename
    }).rename
    if (!permission.visible || permission.disabled) {
      return
    }
    operation.value = { type: 'rename', groupId: group.id, value: group.name }
  }

  const openDelete = (group: TagGroupItem) => {
    const permission = resolveGroupPermissions(group, {
      loading: loading.value,
      disabled: disabled.value,
      allowDelete: props.allowDelete
    }).delete
    if (!permission.visible || permission.disabled) {
      return
    }
    operation.value = { type: 'delete', groupId: group.id, value: '' }
  }

  const setOperationValue = (value: string) => {
    if (operation.value && operation.value.type !== 'delete') {
      operation.value = { ...operation.value, value, error: undefined }
    }
  }

  const submitOperation = (source: 'itemClick' | 'keyboard') => {
    const currentOperation = operation.value
    if (!currentOperation || (currentOperation.type !== 'create' && currentOperation.type !== 'rename')) {
      return
    }

    const validation = validateGroupName(
      currentOperation.value,
      effectiveResult.value.effectiveGroups,
      currentOperation.groupId ?? undefined
    )
    if (validation.error) {
      operation.value = { ...currentOperation, error: validation.error }
      return
    }

    if (currentOperation.type === 'create') {
      emit('createGroup', validation.value, createTagGroupEventMeta(source))
    } else {
      const group = effectiveResult.value.effectiveGroups.find((item) => item.id === currentOperation.groupId)
      if (!group || normalizeDisplayName(group.name) === validation.value) {
        closeOperation()
        return
      }
      emit('renameGroup', group.id, validation.value, createTagGroupEventMeta(source, { groupId: group.id }))
    }

    closeOperation()
  }

  const confirmDelete = (source: 'itemClick' | 'keyboard') => {
    const currentOperation = operation.value
    if (!currentOperation || currentOperation.type !== 'delete' || currentOperation.groupId === null) {
      return
    }

    const group = effectiveResult.value.effectiveGroups.find((item) => item.id === currentOperation.groupId)
    if (!group) {
      closeOperation()
      return
    }

    const permission = resolveGroupPermissions(group, {
      loading: loading.value,
      disabled: disabled.value,
      allowDelete: props.allowDelete
    }).delete
    if (!permission.visible || permission.disabled) {
      return
    }

    emit('deleteGroup', group.id, createTagGroupEventMeta(source, { groupId: group.id }))
    closeOperation()
  }

  return {
    activeGroupId,
    activeGroup,
    effectiveGroups: computed(() => effectiveResult.value.effectiveGroups),
    visibleGroups,
    duplicateIds: computed(() => effectiveResult.value.duplicates),
    searchKeyword: computed(() => searchKeyword.value),
    texts,
    operation: computed(() => operation.value),
    initialResolution: computed(() => initialResolution.value),
    selectGroup,
    setSearchKeyword,
    openCreate,
    openRename,
    openDelete,
    setOperationValue,
    submitOperation,
    confirmDelete,
    closeOperation
  }
}

export const getDeleteTarget = (
  operation: TagGroupOperationState | null,
  groups: readonly TagGroupItem[]
): TagGroupItem | null => {
  if (operation?.type !== 'delete' || operation.groupId === null) {
    return null
  }
  return groups.find((group) => group.id === operation.groupId) ?? null
}
