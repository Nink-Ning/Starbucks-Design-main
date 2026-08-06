import type { TagGroupEmptyContext, TagGroupItem } from './interface'
import { createNameComparisonKey } from './normalize'

export interface SearchTransitionResult {
  keyword: string
  filteredGroups: readonly TagGroupItem[]
}

export const normalizeSearchKeyword = (keyword: string): string => keyword.trim()

export const filterTagGroups = (groups: readonly TagGroupItem[], keyword: string): readonly TagGroupItem[] => {
  const keywordKey = createNameComparisonKey(keyword)
  if (keywordKey.length === 0) {
    return groups
  }

  return groups.filter((group) => createNameComparisonKey(group.name).includes(keywordKey))
}

export const resolveSearchTransition = (
  previousSearchable: boolean,
  searchable: boolean,
  keyword: string,
  groups: readonly TagGroupItem[]
): SearchTransitionResult => {
  if (previousSearchable && !searchable) {
    return { keyword: '', filteredGroups: groups }
  }
  if (!searchable) {
    return { keyword: '', filteredGroups: groups }
  }

  return { keyword, filteredGroups: filterTagGroups(groups, keyword) }
}

export const resolveEmptyContext = (
  groups: readonly TagGroupItem[],
  filteredGroups: readonly TagGroupItem[],
  keyword: string
): TagGroupEmptyContext | null => {
  if (filteredGroups.length > 0) {
    return null
  }

  const normalizedKeyword = normalizeSearchKeyword(keyword)
  return {
    type: groups.length === 0 ? 'empty' : 'searchEmpty',
    keyword: normalizedKeyword
  }
}
