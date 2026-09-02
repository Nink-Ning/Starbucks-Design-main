import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TagGroupDeleteConfirm, TagGroupItem, TagGroupManagementProps } from './interface'
import { resolveTagGroupManagementTexts } from './constants'
import { normalizeSearchKeyword, filterTagGroups } from './search'
import {
  deriveActiveGroup,
  deriveEffectiveGroups,
  resolveGroupsUpdateFallback,
  resolveInitialActiveGroupId,
  createTagGroupEventMeta,
  isActiveGroupControlled
} from './selection'
import { resolveCanCreate, resolveGroupPermissions } from './permissions'
import { validateGroupName, type TagGroupNameError } from './normalize'

export const TAG_GROUP_SEARCH_DEBOUNCE_MS = 500

export type TagGroupOperationType = 'create' | 'rename' | 'delete'

export interface TagGroupOperationState {
  type: TagGroupOperationType
  groupId: string | null
  value: string
  error?: TagGroupNameError
}

export interface UseTagGroupManagementResult {
  activeGroupId: string | null
  activeGroup: TagGroupItem | null
  effectiveGroups: TagGroupItem[]
  visibleGroups: readonly TagGroupItem[]
  duplicateIds: Array<{ id: string; indexes: number[] }>
  searchKeyword: string
  texts: ReturnType<typeof resolveTagGroupManagementTexts>
  operation: TagGroupOperationState | null
  initialResolution: 'pending' | 'resolved'
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

const getDeleteConfirm = (deleteConfirm: TagGroupDeleteConfirm | undefined, group: TagGroupItem) => {
  if (typeof deleteConfirm === 'function') {
    return deleteConfirm(group)
  }

  return deleteConfirm ?? {}
}

export const resolveTagGroupDeleteConfirm = getDeleteConfirm

export const useTagGroupManagement = (props: TagGroupManagementProps): UseTagGroupManagementResult => {
  const loading = Boolean(props.loading)
  const disabled = Boolean(props.disabled)
  const searchable = props.searchable !== false
  const controlled = isActiveGroupControlled(props.activeGroupId)
  const texts = useMemo(() => resolveTagGroupManagementTexts(props.texts), [props.texts])
  const effectiveResult = useMemo(() => deriveEffectiveGroups(props.groups), [props.groups])
  const initialResolutionValue: 'pending' | 'resolved' = controlled || !loading ? 'resolved' : 'pending'
  const initialActiveGroupId =
    !controlled && !loading
      ? resolveInitialActiveGroupId(effectiveResult.effectiveGroups, {
          loading: false,
          initialResolution: 'pending',
          activeGroupId: null,
          defaultActiveGroupId: props.defaultActiveGroupId
        })
      : null
  const [internalActiveGroupId, setInternalActiveGroupId] = useState<string | null>(() => initialActiveGroupId)
  const [searchKeyword, setSearchKeywordState] = useState('')
  const [operation, setOperation] = useState<TagGroupOperationState | null>(null)
  const initialResolutionRef = useRef<'pending' | 'resolved'>(initialResolutionValue)
  const [initialResolution, setInitialResolution] = useState<'pending' | 'resolved'>(initialResolutionValue)
  const previousGroupsRef = useRef<TagGroupItem[] | null>(null)
  const warnedDuplicateKeysRef = useRef(new Set<string>())
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousSearchableRef = useRef(searchable)
  const activeGroupId = controlled ? (props.activeGroupId ?? null) : internalActiveGroupId
  const activeGroup = useMemo(
    () => deriveActiveGroup(effectiveResult.effectiveGroups, activeGroupId),
    [activeGroupId, effectiveResult.effectiveGroups]
  )
  const visibleGroups = useMemo(
    () =>
      searchable ? filterTagGroups(effectiveResult.effectiveGroups, searchKeyword) : effectiveResult.effectiveGroups,
    [effectiveResult.effectiveGroups, searchKeyword, searchable]
  )

  const onActiveGroupChangeRef = useRef(props.onActiveGroupChange)
  const onSearchChangeRef = useRef(props.onSearchChange)
  const onCreateGroupRef = useRef(props.onCreateGroup)
  const onRenameGroupRef = useRef(props.onRenameGroup)
  const onDeleteGroupRef = useRef(props.onDeleteGroup)

  useEffect(() => {
    onActiveGroupChangeRef.current = props.onActiveGroupChange
    onSearchChangeRef.current = props.onSearchChange
    onCreateGroupRef.current = props.onCreateGroup
    onRenameGroupRef.current = props.onRenameGroup
    onDeleteGroupRef.current = props.onDeleteGroup
  })

  useEffect(() => {
    if (effectiveResult.duplicateKey && !warnedDuplicateKeysRef.current.has(effectiveResult.duplicateKey)) {
      warnedDuplicateKeysRef.current.add(effectiveResult.duplicateKey)
      const details = effectiveResult.duplicates.map(({ id, indexes }) => `${id} [${indexes.join(', ')}]`).join('; ')
      console.warn(`[TagGroupManagement] duplicate group id(s); first occurrence wins: ${details}`)
    }
  }, [effectiveResult.duplicateKey, effectiveResult.duplicates])

  useEffect(() => {
    if (controlled) {
      initialResolutionRef.current = 'resolved'
      previousGroupsRef.current = effectiveResult.effectiveGroups
      return
    }

    if (initialResolutionRef.current === 'pending') {
      if (!loading) {
        const nextActiveGroupId = resolveInitialActiveGroupId(effectiveResult.effectiveGroups, {
          loading: false,
          initialResolution: 'pending',
          activeGroupId: null,
          defaultActiveGroupId: props.defaultActiveGroupId
        })
        initialResolutionRef.current = 'resolved'
        setInitialResolution('resolved')
        setInternalActiveGroupId(nextActiveGroupId)
      }
      previousGroupsRef.current = effectiveResult.effectiveGroups
      return
    }

    const previousGroups = previousGroupsRef.current
    previousGroupsRef.current = effectiveResult.effectiveGroups
    if (!previousGroups || activeGroupId === null) {
      return
    }

    const fallback = resolveGroupsUpdateFallback(previousGroups, effectiveResult.effectiveGroups, activeGroupId)
    if (fallback.changed) {
      setInternalActiveGroupId(fallback.activeGroupId)
      onActiveGroupChangeRef.current?.(
        fallback.activeGroupId,
        createTagGroupEventMeta('groupsUpdateFallback', { groupId: fallback.activeGroupId })
      )
    }
  }, [activeGroupId, controlled, effectiveResult.effectiveGroups, loading, props.defaultActiveGroupId])

  const clearSearchTimer = useCallback(() => {
    if (searchTimerRef.current !== null) {
      clearTimeout(searchTimerRef.current)
      searchTimerRef.current = null
    }
  }, [])

  useEffect(() => clearSearchTimer, [clearSearchTimer])

  useEffect(() => {
    const wasSearchable = previousSearchableRef.current
    if (wasSearchable && !searchable) {
      clearSearchTimer()
      setSearchKeywordState('')
      setOperation(null)
    }
    previousSearchableRef.current = searchable
  }, [clearSearchTimer, searchable])

  useEffect(() => {
    if (loading || disabled) {
      clearSearchTimer()
      setOperation(null)
    }
  }, [clearSearchTimer, disabled, loading])

  useEffect(() => {
    if (
      operation &&
      (operation.groupId === null || !effectiveResult.effectiveGroups.some((group) => group.id === operation.groupId))
    ) {
      if (operation.type !== 'create') {
        setOperation(null)
      }
    }
  }, [effectiveResult.effectiveGroups, operation])

  useEffect(() => {
    if (operation?.groupId !== null && operation?.groupId !== undefined) {
      const group = effectiveResult.effectiveGroups.find((item) => item.id === operation.groupId)
      if (!group) {
        setOperation(null)
      }
    }
  }, [effectiveResult.effectiveGroups, operation?.groupId])

  useEffect(() => {
    return () => clearSearchTimer()
  }, [clearSearchTimer])

  const selectGroup = useCallback(
    (groupId: string, source: 'itemClick' | 'keyboard') => {
      if (loading || disabled) {
        return
      }

      const group = effectiveResult.effectiveGroups.find((item) => item.id === groupId)
      if (!group || group.disabled || group.id === activeGroupId) {
        return
      }

      if (!controlled) {
        setInternalActiveGroupId(group.id)
      }
      onActiveGroupChangeRef.current?.(group.id, createTagGroupEventMeta(source, { groupId: group.id }))
    },
    [activeGroupId, controlled, disabled, effectiveResult.effectiveGroups, loading]
  )

  const setSearchKeyword = useCallback(
    (keyword: string) => {
      if (!searchable || loading || disabled) {
        return
      }

      setSearchKeywordState(keyword)
      clearSearchTimer()
      setOperation(null)
      searchTimerRef.current = setTimeout(() => {
        searchTimerRef.current = null
        const normalizedKeyword = normalizeSearchKeyword(keyword)
        onSearchChangeRef.current?.(
          normalizedKeyword,
          createTagGroupEventMeta('search', { keyword: normalizedKeyword })
        )
      }, TAG_GROUP_SEARCH_DEBOUNCE_MS)
    },
    [clearSearchTimer, disabled, loading, searchable]
  )

  const openCreate = useCallback(() => {
    if (!resolveCanCreate({ loading, disabled, allowCreate: props.allowCreate })) {
      return
    }
    setOperation({ type: 'create', groupId: null, value: '' })
  }, [disabled, loading, props.allowCreate])

  const openRename = useCallback(
    (group: TagGroupItem) => {
      const permission = resolveGroupPermissions(group, {
        loading,
        disabled,
        allowRename: props.allowRename
      }).rename
      if (!permission.visible || permission.disabled) {
        return
      }
      setOperation({ type: 'rename', groupId: group.id, value: group.name })
    },
    [disabled, loading, props.allowRename]
  )

  const openDelete = useCallback(
    (group: TagGroupItem) => {
      const permission = resolveGroupPermissions(group, {
        loading,
        disabled,
        allowDelete: props.allowDelete
      }).delete
      if (!permission.visible || permission.disabled) {
        return
      }
      setOperation({ type: 'delete', groupId: group.id, value: '' })
    },
    [disabled, loading, props.allowDelete]
  )

  const setOperationValue = useCallback((value: string) => {
    setOperation((current) =>
      current && current.type !== 'delete' ? { ...current, value, error: undefined } : current
    )
  }, [])

  const closeOperation = useCallback(() => setOperation(null), [])

  const submitOperation = useCallback(
    (source: 'itemClick' | 'keyboard') => {
      if (!operation || (operation.type !== 'create' && operation.type !== 'rename')) {
        return
      }
      const validation = validateGroupName(
        operation.value,
        effectiveResult.effectiveGroups,
        operation.groupId ?? undefined
      )
      if (validation.error) {
        setOperation((current) => (current ? { ...current, error: validation.error } : current))
        return
      }

      if (operation.type === 'create') {
        onCreateGroupRef.current?.(validation.value, createTagGroupEventMeta(source))
      } else {
        const group = effectiveResult.effectiveGroups.find((item) => item.id === operation.groupId)
        if (!group || normalizeSearchKeyword(group.name) === normalizeSearchKeyword(validation.value)) {
          setOperation(null)
          return
        }
        onRenameGroupRef.current?.(group.id, validation.value, createTagGroupEventMeta(source, { groupId: group.id }))
      }
      setOperation(null)
    },
    [effectiveResult.effectiveGroups, operation]
  )

  const confirmDelete = useCallback(
    (source: 'itemClick' | 'keyboard') => {
      if (!operation || operation.type !== 'delete' || operation.groupId === null) {
        return
      }
      const group = effectiveResult.effectiveGroups.find((item) => item.id === operation.groupId)
      if (!group) {
        setOperation(null)
        return
      }
      const permission = resolveGroupPermissions(group, {
        loading,
        disabled,
        allowDelete: props.allowDelete
      }).delete
      if (!permission.visible || permission.disabled) {
        return
      }
      onDeleteGroupRef.current?.(group.id, createTagGroupEventMeta(source, { groupId: group.id }))
      setOperation(null)
    },
    [disabled, effectiveResult.effectiveGroups, loading, operation, props.allowDelete]
  )

  return {
    activeGroupId,
    activeGroup,
    effectiveGroups: effectiveResult.effectiveGroups,
    visibleGroups,
    duplicateIds: effectiveResult.duplicates,
    searchKeyword,
    texts,
    operation,
    initialResolution,
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
