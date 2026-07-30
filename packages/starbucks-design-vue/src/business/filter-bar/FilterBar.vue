<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'
import { Button as AButton } from '@arco-design/web-vue'
import { IconDown, IconUp } from '@arco-design/web-vue/es/icon'
import type {
  FilterBarEmits,
  FilterBarProps,
  FilterFieldSchema,
  FilterRenderFieldContext,
} from './interface'
import { resolveResponsiveFieldSpans } from './layout'
import { getFilterFieldAdapter } from './adapters'
import { useFilterBar } from './use-filter-bar'

defineOptions({ name: 'FilterBar' })

const props = withDefaults(defineProps<FilterBarProps>(), {
  fields: () => [],
  collapsible: undefined,
  expanded: undefined,
  submitMode: 'manual',
  debounceMs: 300,
  submitOnReset: true,
  defaultExpanded: false,
  loading: false,
  disabled: false,
  showSubmit: undefined,
  showReset: undefined,
})

const emit = defineEmits<FilterBarEmits>()
const slots = useSlots()
const state = useFilterBar(props, emit)
const idPrefix = useId().replace(/:/g, '')
const {
  columns,
  draftValues,
  expanded,
  layout,
  errorsByName,
  texts,
  showSubmit,
  showReset,
  hiddenActiveSummaryCount,
  isInteractiveDisabled,
  isFieldDisabled,
  registerControlElement,
  handleFieldChange,
  handleSubmit,
  handleReset,
  handleExpandedChange,
} = state

const showExpandToggle = computed(
  () => layout.value.collapsible && props.collapsible !== false,
)
const getResponsiveFieldSpans = (field: FilterFieldSchema) =>
  resolveResponsiveFieldSpans(field.span, columns.value)

const getControlId = (field: FilterFieldSchema) => `${idPrefix}-${field.name}-control`
const getHelpId = (field: FilterFieldSchema) => `${idPrefix}-${field.name}-help`
const getErrorId = (field: FilterFieldSchema) => `${idPrefix}-${field.name}-error`
const getDescribedBy = (field: FilterFieldSchema) => {
  const error = errorsByName.value.get(field.name)
  return [
    field.help ? getHelpId(field) : undefined,
    error ? getErrorId(field) : undefined,
  ].filter(Boolean).join(' ') || undefined
}
const getAdapter = (field: FilterFieldSchema) =>
  getFilterFieldAdapter({
    field,
    value: draftValues.value[field.name],
    disabled: isFieldDisabled(field),
    error: errorsByName.value.get(field.name),
    controlId: getControlId(field),
    describedBy: getDescribedBy(field),
    onChange: (value) => handleFieldChange(field, value),
  })
const getRenderFieldContext = (field: FilterFieldSchema): FilterRenderFieldContext => ({
  field,
  value: draftValues.value[field.name],
  disabled: isFieldDisabled(field),
  error: errorsByName.value.get(field.name),
  controlId: getControlId(field),
  onChange: (value) => handleFieldChange(field, value),
})
</script>

<template>
  <div
    v-if="layout.eligibleFields.length > 0"
    class="sbux-filter-bar"
    :data-expanded="expanded ? 'true' : 'false'"
    :data-collapsible="layout.collapsible ? 'true' : 'false'"
    :data-loading="loading ? 'true' : 'false'"
    :data-disabled="disabled ? 'true' : 'false'"
  >
    <div
      class="sbux-filter-bar__fields"
      :data-columns-xs="columns.xs"
      :data-columns-sm="columns.sm"
      :data-columns-md="columns.md"
      :data-columns-lg="columns.lg"
      :data-columns-xl="columns.xl"
      :data-columns-xxl="columns.xxl"
    >
      <div
        v-for="field in layout.renderedFields"
        :key="field.name"
        class="sbux-filter-bar__field"
        :data-field-name="field.name"
        :data-field-type="field.type"
        :data-span="getResponsiveFieldSpans(field).xxl"
        :data-span-xs="getResponsiveFieldSpans(field).xs"
        :data-span-sm="getResponsiveFieldSpans(field).sm"
        :data-span-md="getResponsiveFieldSpans(field).md"
        :data-span-lg="getResponsiveFieldSpans(field).lg"
        :data-span-xl="getResponsiveFieldSpans(field).xl"
        :data-span-xxl="getResponsiveFieldSpans(field).xxl"
      >
        <label class="sbux-filter-bar__label" :for="getControlId(field)">
          <span v-if="field.required" class="sbux-filter-bar__required">*</span>
          <span class="sbux-filter-bar__label-text">{{ field.label }}</span>
        </label>
        <div
          :ref="(element) => registerControlElement(field.name, element as HTMLElement | null)"
          class="sbux-filter-bar__control"
          tabindex="-1"
        >
          <slot
            v-if="slots.field"
            name="field"
            v-bind="getRenderFieldContext(field)"
          />
          <component
            :is="getAdapter(field).component"
            v-else
            v-bind="getAdapter(field).props"
            v-on="getAdapter(field).events"
          />
        </div>
        <div v-if="field.help" :id="getHelpId(field)" class="sbux-filter-bar__help">
          {{ field.help }}
        </div>
        <div
          v-if="errorsByName.get(field.name)"
          :id="getErrorId(field)"
          class="sbux-filter-bar__error"
          role="alert"
        >
          {{ errorsByName.get(field.name)?.message }}
        </div>
      </div>
    </div>
    <div class="sbux-filter-bar__actions">
      <span
        v-if="
          !expanded &&
          layout.collapsedFieldNames.length > 0 &&
          hiddenActiveSummaryCount > 0
        "
        class="sbux-filter-bar__hidden-summary"
        aria-live="polite"
      >
        {{ texts.hiddenActiveSummary(hiddenActiveSummaryCount) }}
      </span>
      <div class="sbux-filter-bar__buttons">
        <AButton
          v-if="showSubmit"
          class="sbux-filter-bar__submit"
          type="primary"
          :loading="loading"
          :disabled="isInteractiveDisabled"
          @click="handleSubmit"
        >
          {{ texts.submit }}
        </AButton>
        <AButton
          v-if="showReset"
          class="sbux-filter-bar__reset"
          :disabled="isInteractiveDisabled"
          @click="handleReset"
        >
          {{ texts.reset }}
        </AButton>
        <AButton
          v-if="showExpandToggle"
          class="sbux-filter-bar__expand"
          type="text"
          :disabled="disabled"
          :aria-label="expanded ? texts.collapse : texts.expand"
          :aria-expanded="expanded"
          @click="handleExpandedChange(!expanded)"
        >
          <template #icon>
            <IconUp v-if="expanded" />
            <IconDown v-else />
          </template>
          {{ expanded ? texts.collapse : texts.expand }}
        </AButton>
      </div>
    </div>
  </div>
</template>
