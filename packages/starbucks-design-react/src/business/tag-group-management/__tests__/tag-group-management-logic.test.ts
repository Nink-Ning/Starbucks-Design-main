import { describe, expect, it } from 'vitest'
import type { TagGroupItem } from '../interface'
import { DEFAULT_TAG_GROUP_MANAGEMENT_TEXTS, resolveTagGroupManagementTexts } from '../constants'
import { countNameCharacters, createNameComparisonKey, normalizeDisplayName, validateGroupName } from '../normalize'
import {
  createTagGroupEventMeta,
  deriveEffectiveGroups,
  deriveActiveGroup,
  getNavigableGroupIds,
  isActiveGroupControlled,
  isGroupActivationKey,
  resolveInitialActiveGroupId,
  resolveKeyboardFocusTarget,
  resolveGroupsUpdateFallback
} from '../selection'
import { filterTagGroups, resolveEmptyContext, resolveSearchTransition } from '../search'
import { resolveCanCreate, resolveGroupPermissions } from '../permissions'
import {
  deriveEffectiveGroups as getVueEffectiveGroups,
  resolveKeyboardFocusTarget as getVueKeyboardFocusTarget,
  resolveGroupsUpdateFallback as resolveVueGroupsUpdateFallback,
  resolveInitialActiveGroupId as resolveVueInitialActiveGroupId
} from '../../../../../starbucks-design-vue/src/business/tag-group-management/selection'
import {
  filterTagGroups as filterVueTagGroups,
  resolveEmptyContext as getVueEmptyContext
} from '../../../../../starbucks-design-vue/src/business/tag-group-management/search'
import { validateGroupName as validateVueGroupName } from '../../../../../starbucks-design-vue/src/business/tag-group-management/normalize'
import { resolveGroupPermissions as resolveVueGroupPermissions } from '../../../../../starbucks-design-vue/src/business/tag-group-management/permissions'

const groups: TagGroupItem[] = [
  { id: 'all', name: '全部' },
  { id: 'store', name: '门店' },
  { id: 'member', name: '会员', disabled: true }
]

describe('TagGroupManagement pure contract', () => {
  it('keeps the first occurrence and returns duplicate warning data without side effects', () => {
    const result = deriveEffectiveGroups([
      { id: 'one', name: 'First' },
      { id: 'two', name: 'Second' },
      { id: 'one', name: 'Duplicate' },
      { id: 'one', name: 'Duplicate again' }
    ])

    expect(result.effectiveGroups.map((group) => group.name)).toEqual(['First', 'Second'])
    expect(result.duplicates).toEqual([{ id: 'one', indexes: [0, 2, 3] }])
    expect(result.duplicateKey).toBe('one:0,2,3')
  })

  it('resolves the initial active group from the default and available groups', () => {
    const options = (defaultActiveGroupId?: string | null) => ({
      loading: false,
      initialResolution: 'pending' as const,
      activeGroupId: null,
      defaultActiveGroupId
    })

    expect(resolveInitialActiveGroupId(groups, options('store'))).toBe('store')
    expect(resolveInitialActiveGroupId(groups, options(null))).toBeNull()
    expect(resolveInitialActiveGroupId(groups, options('missing'))).toBe('all')
    expect(resolveInitialActiveGroupId([{ id: 'disabled', name: 'Disabled', disabled: true }], options())).toBeNull()
  })

  it('distinguishes controlled null from uncontrolled activeGroupId', () => {
    expect(isActiveGroupControlled(undefined)).toBe(false)
    expect(isActiveGroupControlled(null)).toBe(true)
    expect(isActiveGroupControlled('store')).toBe(true)
  })

  it('derives the active group from effective groups while retaining disabled active groups', () => {
    expect(deriveActiveGroup(groups, 'store')).toEqual(groups[1])
    expect(deriveActiveGroup([{ id: 'store', name: 'Store', disabled: true }], 'store')).toEqual({
      id: 'store',
      name: 'Store',
      disabled: true
    })
    expect(deriveActiveGroup(groups, 'missing')).toBeNull()
  })

  it('falls back to the next then previous available group when the active group disappears', () => {
    const previous = [
      { id: 'first', name: 'First' },
      { id: 'current', name: 'Current' },
      { id: 'next', name: 'Next' }
    ]

    expect(resolveGroupsUpdateFallback(previous, [previous[0], previous[2]], 'current')).toEqual({
      activeGroupId: 'next',
      changed: true
    })
    expect(resolveGroupsUpdateFallback(previous, [previous[0]], 'current')).toEqual({
      activeGroupId: 'first',
      changed: true
    })
    expect(resolveGroupsUpdateFallback(previous, [{ ...previous[2], disabled: true }, previous[0]], 'current')).toEqual(
      { activeGroupId: 'first', changed: true }
    )
    expect(resolveGroupsUpdateFallback(previous, [], 'current')).toEqual({
      activeGroupId: null,
      changed: true
    })
  })

  it('keeps the active group when it remains but becomes disabled', () => {
    expect(
      resolveGroupsUpdateFallback(groups, [groups[0], groups[1], { ...groups[2], disabled: false }], 'store')
    ).toEqual({ activeGroupId: 'store', changed: false })
    expect(resolveGroupsUpdateFallback(groups, [{ ...groups[1], disabled: true }], 'store')).toEqual({
      activeGroupId: 'store',
      changed: false
    })
  })

  it('filters only by group name and restores all groups when searchable is disabled', () => {
    expect(filterTagGroups(groups, ' 门 ')).toEqual([groups[1]])
    expect(filterTagGroups(groups, '会')).toEqual([groups[2]])
    expect(resolveSearchTransition(true, false, 'store', groups)).toEqual({
      keyword: '',
      filteredGroups: groups
    })
  })

  it('matches trimmed English keys case-insensitively and preserves disabled groups', () => {
    const marketingGroups: TagGroupItem[] = [
      { id: 'title-case', name: 'Marketing' },
      { id: 'upper-case', name: 'MARKETING', disabled: true },
      { id: 'mixed', name: 'Marketing 标签' },
      { id: 'chinese', name: '标签营销' }
    ]
    const original = [...marketingGroups]

    expect(filterTagGroups(marketingGroups, ' marketing ')).toEqual(marketingGroups.slice(0, 3))
    expect(filterTagGroups(marketingGroups, 'MARKETING')).toEqual(marketingGroups.slice(0, 3))
    expect(filterTagGroups(marketingGroups, '标签')).toEqual([marketingGroups[2], marketingGroups[3]])
    expect(filterTagGroups(marketingGroups, '营销')).toEqual([marketingGroups[3]])
    expect(filterTagGroups(marketingGroups, 'does-not-exist')).toEqual([])
    expect(filterTagGroups(marketingGroups, '   ')).toBe(marketingGroups)
    expect(marketingGroups).toEqual(original)
  })

  it('returns separate empty and search-empty contexts', () => {
    expect(resolveEmptyContext([], [], '')).toEqual({ type: 'empty', keyword: '' })
    expect(resolveEmptyContext(groups, [], 'unknown')).toEqual({
      type: 'searchEmpty',
      keyword: 'unknown'
    })
    expect(resolveEmptyContext(groups, groups, '')).toBeNull()
  })

  it('normalizes names with stable trim, Unicode counting, and lowercase comparison', () => {
    expect(normalizeDisplayName('  门店  ')).toBe('门店')
    expect(countNameCharacters('A🙂中')).toBe(3)
    expect(createNameComparisonKey('  Store ')).toBe('store')
    expect(validateGroupName('  STORE  ', [{ id: 'store', name: 'Store' }])).toEqual({
      value: 'STORE',
      error: 'duplicate'
    })
    expect(validateGroupName('  Store  ', [{ id: 'store', name: 'Store' }], 'store')).toEqual({
      value: 'Store'
    })
    expect(validateGroupName('   ', groups)).toEqual({ value: '', error: 'required' })
    expect(validateGroupName('123456789012345678901', groups)).toEqual({
      value: '123456789012345678901',
      error: 'tooLong'
    })
  })

  it('calculates operation visibility and disabled state by priority', () => {
    expect(
      resolveGroupPermissions(
        { id: 'store', name: 'Store', allowDelete: false, deleteDisabledReason: '存在关联数据' },
        { allowCreate: false, loading: true }
      )
    ).toEqual({
      create: { visible: false, disabled: true },
      rename: { visible: true, disabled: true },
      delete: { visible: true, disabled: true, disabledReason: '存在关联数据' }
    })
    expect(resolveGroupPermissions({ id: 'store', name: 'Store', allowRename: false }, { disabled: true })).toEqual({
      create: { visible: true, disabled: true },
      rename: { visible: false, disabled: true },
      delete: { visible: true, disabled: true }
    })
  })

  it('calculates keyboard targets only among visible, enabled group buttons', () => {
    expect(resolveKeyboardFocusTarget(groups, 'all', 'ArrowDown')).toBe('store')
    expect(resolveKeyboardFocusTarget(groups, 'store', 'ArrowDown')).toBe('store')
    expect(resolveKeyboardFocusTarget(groups, 'store', 'ArrowUp')).toBe('all')
    expect(resolveKeyboardFocusTarget(groups, 'store', 'Home')).toBe('all')
    expect(resolveKeyboardFocusTarget(groups, 'all', 'End')).toBe('store')
    expect(resolveKeyboardFocusTarget(groups, 'member', 'ArrowDown')).toBe('all')
    expect(isGroupActivationKey('Enter')).toBe(true)
    expect(isGroupActivationKey(' ')).toBe(true)
    expect(isGroupActivationKey('Escape')).toBe(false)
  })

  it('provides stable default texts and shallow overrides', () => {
    expect(DEFAULT_TAG_GROUP_MANAGEMENT_TEXTS.nameTooLong).toBe('标签组名称不能超过20个字符')
    expect(resolveTagGroupManagementTexts({ create: '添加' })).toEqual({
      ...DEFAULT_TAG_GROUP_MANAGEMENT_TEXTS,
      create: '添加'
    })
  })

  it('keeps the final pure-function contract names available', () => {
    const initialOptions = {
      loading: false,
      initialResolution: 'pending' as const,
      activeGroupId: null,
      defaultActiveGroupId: 'store'
    }

    expect(deriveEffectiveGroups(groups)).toEqual(deriveEffectiveGroups(groups))
    expect(resolveInitialActiveGroupId(groups, initialOptions)).toBe('store')
    expect(getNavigableGroupIds(groups)).toEqual(['all', 'store'])
    expect(resolveKeyboardFocusTarget(groups, 'all', 'ArrowDown')).toBe('store')
    expect(resolveEmptyContext(groups, [], 'unknown')).toEqual({
      type: 'searchEmpty',
      keyword: 'unknown'
    })
    expect(resolveGroupPermissions(groups[1], { loading: false })).toEqual(
      resolveGroupPermissions(groups[1], { loading: false })
    )
    expect(resolveCanCreate()).toBe(true)
    expect(resolveCanCreate({ disabled: true })).toBe(false)
    expect(createTagGroupEventMeta('search', { keyword: 'store' })).toEqual({
      source: 'search',
      keyword: 'store'
    })
  })

  it('keeps React and Vue pure outputs equivalent for the same input', () => {
    const duplicateGroups = [
      { id: 'one', name: 'First' },
      { id: 'two', name: 'Second', disabled: true },
      { id: 'one', name: 'Duplicate' }
    ]
    const initialOptions = {
      loading: false,
      initialResolution: 'pending' as const,
      activeGroupId: null,
      defaultActiveGroupId: 'one'
    }

    expect(deriveEffectiveGroups(duplicateGroups)).toEqual(getVueEffectiveGroups(duplicateGroups))
    expect(resolveInitialActiveGroupId(duplicateGroups, initialOptions)).toEqual(
      resolveVueInitialActiveGroupId(duplicateGroups, initialOptions)
    )
    expect(resolveGroupsUpdateFallback(duplicateGroups, [{ id: 'one', name: 'First' }], 'two')).toEqual(
      resolveVueGroupsUpdateFallback(duplicateGroups, [{ id: 'one', name: 'First' }], 'two')
    )
    expect(resolveKeyboardFocusTarget(duplicateGroups, 'one', 'End')).toEqual(
      getVueKeyboardFocusTarget(duplicateGroups, 'one', 'End')
    )
    expect(filterTagGroups(duplicateGroups, 'Sec')).toEqual(filterVueTagGroups(duplicateGroups, 'Sec'))
    expect(resolveEmptyContext(duplicateGroups, [], 'missing')).toEqual(
      getVueEmptyContext(duplicateGroups, [], 'missing')
    )
    expect(validateGroupName(' First ', duplicateGroups)).toEqual(validateVueGroupName(' First ', duplicateGroups))
    expect(resolveGroupPermissions(duplicateGroups[0], { allowDelete: false, loading: true })).toEqual(
      resolveVueGroupPermissions(duplicateGroups[0], { allowDelete: false, loading: true })
    )
  })
})
