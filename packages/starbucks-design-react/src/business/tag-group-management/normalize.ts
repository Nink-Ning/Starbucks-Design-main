import { TAG_GROUP_MAX_NAME_LENGTH } from './constants'
import type { TagGroupItem } from './interface'

export type TagGroupNameError = 'required' | 'duplicate' | 'tooLong'

export interface TagGroupNameValidationResult {
  value: string
  error?: TagGroupNameError
}

export const normalizeDisplayName = (value: string): string => value.trim()

export const countNameCharacters = (value: string): number => Array.from(value).length

export const createNameComparisonKey = (value: string): string => normalizeDisplayName(value).toLowerCase()

export const validateGroupName = (
  value: string,
  groups: readonly TagGroupItem[],
  editingGroupId?: string
): TagGroupNameValidationResult => {
  const normalizedValue = normalizeDisplayName(value)

  if (normalizedValue.length === 0) {
    return { value: normalizedValue, error: 'required' }
  }

  if (countNameCharacters(normalizedValue) > TAG_GROUP_MAX_NAME_LENGTH) {
    return { value: normalizedValue, error: 'tooLong' }
  }

  const comparisonKey = createNameComparisonKey(normalizedValue)
  const duplicate = groups.some(
    (group) => group.id !== editingGroupId && createNameComparisonKey(group.name) === comparisonKey
  )

  return duplicate ? { value: normalizedValue, error: 'duplicate' } : { value: normalizedValue }
}
