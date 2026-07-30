import type { FilterFieldSchema, FilterRule, FilterValidationError, FilterValue } from './interface'
import { isEmptyFieldValue } from './normalize'

export interface ValidateFilterFieldsOptions {
  requiredMessage?: string
}

const getEffectiveRules = (field: FilterFieldSchema): FilterRule[] => {
  const rules = field.rules ?? []
  if (!field.required) {
    return rules
  }
  return [{ required: true }, ...rules]
}

export const validateFilterFields = (
  fields: FilterFieldSchema[],
  values: FilterValue,
  options: ValidateFilterFieldsOptions = {},
): FilterValidationError[] => {
  const errors: FilterValidationError[] = []
  const fallbackRequiredMessage = options.requiredMessage ?? '该字段为必填项'

  for (const field of fields) {
    if (field.visible === false) {
      continue
    }

    const value = values[field.name]
    const rules = getEffectiveRules(field)

    for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex += 1) {
      const rule = rules[ruleIndex]
      let message: string | void = undefined

      if ('required' in rule && rule.required) {
        if (isEmptyFieldValue(field, value)) {
          message = rule.message ?? fallbackRequiredMessage
        }
      } else if ('validator' in rule) {
        message = rule.validator(value, field)
      }

      if (message) {
        errors.push({
          fieldName: field.name,
          message,
          ruleIndex,
        })
        break
      }
    }
  }

  return errors
}
