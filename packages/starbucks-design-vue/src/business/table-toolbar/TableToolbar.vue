<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Button, Doption, Dropdown, Input, RadioGroup, RangePicker, Select, Tooltip } from '@arco-design/web-vue'
import { IconDown, IconExport, IconRefresh, IconSearch, IconSettings } from '@arco-design/web-vue/es/icon'
import type {
  TableToolbarAction,
  TableToolbarEmits,
  TableToolbarProps,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterEventMeta,
  TableToolbarQuickFilterSource,
  TableToolbarToolName
} from './interface'
import {
  DEFAULT_TABLE_TOOLBAR_DATE_FORMAT,
  DEFAULT_TABLE_TOOLBAR_TEXTS,
  applyQuickFilterValue,
  createInitialQuickFilterValues,
  getToolbarOverflowActions,
  getSearchDraftValues,
  getVisibleActions,
  hasVisibleTableTools,
  normalizeQuickFilterValues,
  normalizeQuickFilters,
  normalizeSelectedCount,
  normalizeToolConfig
} from './normalize'

defineOptions({ name: 'TableToolbar' })

const props = withDefaults(defineProps<TableToolbarProps>(), {
  quickFilters: () => [],
  operationActions: () => [],
  moreActions: () => [],
  selectedCount: 0,
  disabled: false
})
const emit = defineEmits<TableToolbarEmits>()

const quickFilters = computed(() => normalizeQuickFilters(props.quickFilters))
const quickFilterKey = computed(() => quickFilters.value.map((filter) => `${filter.name}:${filter.type}`).join('|'))
const isControlled = computed(() => props.quickFilterValues !== undefined)
const uncontrolledValues = ref(createInitialQuickFilterValues(quickFilters.value, props.defaultQuickFilterValues))
const committedValues = computed(() =>
  normalizeQuickFilterValues(
    quickFilters.value,
    isControlled.value ? props.quickFilterValues : uncontrolledValues.value
  )
)
const searchDrafts = ref<Record<string, string>>(getSearchDraftValues(quickFilters.value, committedValues.value))
const searchSignature = computed(() => JSON.stringify(getSearchDraftValues(quickFilters.value, committedValues.value)))

watch(quickFilterKey, () => {
  if (!isControlled.value) {
    uncontrolledValues.value = normalizeQuickFilterValues(quickFilters.value, uncontrolledValues.value)
  }
})
watch([searchSignature, quickFilterKey], () => {
  searchDrafts.value = getSearchDraftValues(quickFilters.value, committedValues.value)
})

const selectedCount = computed(() => normalizeSelectedCount(props.selectedCount))
const operationActions = computed(() => getVisibleActions(props.operationActions))
const moreActions = computed(() => getVisibleActions(props.moreActions))
const startQuickFilters = computed(() => quickFilters.value.filter((filter) => filter.placement === 'start'))
const endQuickFilters = computed(() => quickFilters.value.filter((filter) => filter.placement !== 'start'))
const hasOperationArea = computed(
  () => selectedCount.value > 0 || operationActions.value.length > 0 || moreActions.value.length > 0
)
const hasStartContent = computed(() => hasOperationArea.value || startQuickFilters.value.length > 0)
const overflowMenus = computed(() =>
  [
    {
      variant: 'wide',
      actions: getToolbarOverflowActions(operationActions.value, moreActions.value, 4)
    },
    {
      variant: 'standard',
      actions: getToolbarOverflowActions(operationActions.value, moreActions.value, 2)
    },
    {
      variant: 'compact',
      actions: getToolbarOverflowActions(operationActions.value, moreActions.value, 1)
    }
  ].filter((menu) => menu.actions.length > 0)
)
const texts = computed(() => ({ ...DEFAULT_TABLE_TOOLBAR_TEXTS, ...props.texts }))
const selectionTextParts = computed(() => {
  const text = texts.value.selected(selectedCount.value)
  const count = String(selectedCount.value)
  const countIndex = text.indexOf(count)
  return countIndex >= 0
    ? {
        prefix: text.slice(0, countIndex),
        count,
        suffix: text.slice(countIndex + count.length)
      }
    : { prefix: text, count: '', suffix: '' }
})
const hasTableTools = computed(() => hasVisibleTableTools(props.tableTools))
const hasContent = computed(
  () =>
    selectedCount.value > 0 ||
    operationActions.value.length > 0 ||
    moreActions.value.length > 0 ||
    quickFilters.value.length > 0 ||
    hasTableTools.value
)

const emitQuickFilterChange = (
  field: TableToolbarQuickFilter,
  value: unknown,
  source: TableToolbarQuickFilterSource
) => {
  const nextValues = applyQuickFilterValue(quickFilters.value, committedValues.value, field.name, value)
  if (!isControlled.value) uncontrolledValues.value = nextValues

  const meta: TableToolbarQuickFilterEventMeta = {
    source,
    fieldName: field.name,
    changedValues: { [field.name]: nextValues[field.name] },
    values: nextValues
  }
  emit('update:quickFilterValues', nextValues)
  emit('quickFilterChange', nextValues, meta)
  return { nextValues, meta }
}

const handleImmediateFilterChange = (field: TableToolbarQuickFilter, value: unknown) => {
  const source: TableToolbarQuickFilterSource =
    field.type === 'select' ? 'selectChange' : field.type === 'buttonGroup' ? 'buttonGroupChange' : 'dateRangeChange'
  emitQuickFilterChange(field, value, source)
}

const handleSearchInput = (field: TableToolbarQuickFilter, value: string) => {
  if (field.type !== 'search') return
  searchDrafts.value = { ...searchDrafts.value, [field.name]: value }
  if (value === '') {
    const result = emitQuickFilterChange(field, '', 'searchClear')
    emit('searchSubmit', '', result.nextValues, result.meta)
  }
}

const handleSearchSubmit = (field: TableToolbarQuickFilter, event: KeyboardEvent) => {
  if (field.type !== 'search' || event.isComposing) return
  const keyword = (searchDrafts.value[field.name] ?? '').trim()
  searchDrafts.value = { ...searchDrafts.value, [field.name]: keyword }
  const result = emitQuickFilterChange(field, keyword, 'searchSubmit')
  emit('searchSubmit', keyword, result.nextValues, result.meta)
}

const actionDisabledReason = (action: TableToolbarAction) => {
  if (action.disabledReason) return action.disabledReason
  if (action.requiresSelection && selectedCount.value === 0) return texts.value.selectionRequired
  return undefined
}
const isActionDisabled = (action: TableToolbarAction) =>
  Boolean(
    props.disabled || action.disabled || action.loading || (action.requiresSelection && selectedCount.value === 0)
  )
const isOverflowMenuDisabled = (actions: readonly TableToolbarAction[]) => actions.every(isActionDisabled)
const handleOperation = (action: TableToolbarAction, source: 'operation' | 'more') => {
  if (isActionDisabled(action)) return
  emit('operation', action.key, { source, selectedCount: selectedCount.value })
}
const handleMoreSelect = (key: unknown, actions: readonly TableToolbarAction[]) => {
  const action = actions.find((item) => item.key === String(key))
  if (action) handleOperation(action, 'more')
}

const defaultFilterWidth = (filter: TableToolbarQuickFilter) => {
  if (filter.type === 'search') return 250
  if (filter.type === 'select') return 180
  if (filter.type === 'dateRange') return 320
  return 'auto'
}
const getFilterStyle = (filter: TableToolbarQuickFilter) => {
  const width = filter.width ?? defaultFilterWidth(filter)
  return { '--sbux-table-toolbar-filter-width': typeof width === 'number' ? `${width}px` : width }
}
const getFilterAriaLabel = (filter: TableToolbarQuickFilter) =>
  filter.ariaLabel ?? ('placeholder' in filter ? filter.placeholder : undefined) ?? filter.name
const getPrimitiveFilterValue = (name: string) => {
  const value = committedValues.value[name]
  return typeof value === 'string' || typeof value === 'number' ? value : undefined
}
const getDateRangeFilterValue = (name: string) => {
  const value = committedValues.value[name]
  return Array.isArray(value) ? (value as string[]) : undefined
}

const toolNames: TableToolbarToolName[] = ['export', 'columnSettings', 'refresh']
const getToolConfig = (name: TableToolbarToolName) => normalizeToolConfig(props.tableTools?.[name])
const visibleToolNames = computed(() => toolNames.filter((name) => getToolConfig(name)))
const toolText = (name: TableToolbarToolName) => texts.value[name]
const toolIcon = (name: TableToolbarToolName) => {
  if (name === 'export') return IconExport
  if (name === 'columnSettings') return IconSettings
  return IconRefresh
}
const isToolDisabled = (name: TableToolbarToolName) => {
  const config = getToolConfig(name)
  return Boolean(props.disabled || config?.disabled || config?.loading)
}
const toolTooltip = (name: TableToolbarToolName) => {
  const config = getToolConfig(name)
  return isToolDisabled(name) && config?.disabledReason ? config.disabledReason : (config?.tooltip ?? toolText(name))
}
const handleTool = (name: TableToolbarToolName) => {
  if (isToolDisabled(name)) return
  const meta = {
    source: name,
    selectedCount: selectedCount.value,
    quickFilterValues: committedValues.value
  }
  if (name === 'export') emit('export', meta)
  else if (name === 'columnSettings') emit('columnSettings', meta)
  else emit('refresh', meta)
}
</script>

<template>
  <div
    v-if="hasContent"
    class="sbux-table-toolbar"
    role="toolbar"
    :aria-label="ariaLabel ?? texts.ariaLabel"
    :data-disabled="disabled ? 'true' : 'false'"
    :data-has-selection="selectedCount > 0 ? 'true' : 'false'"
    :data-has-operations="hasOperationArea ? 'true' : 'false'"
    :data-has-start-content="hasStartContent ? 'true' : 'false'"
  >
    <div v-if="hasStartContent" class="sbux-table-toolbar__start">
      <div v-if="hasOperationArea" class="sbux-table-toolbar__operations">
        <span v-if="selectedCount > 0" class="sbux-table-toolbar__selection" aria-live="polite">
          {{ selectionTextParts.prefix
          }}<strong v-if="selectionTextParts.count" class="sbux-table-toolbar__selection-count">{{
            selectionTextParts.count
          }}</strong
          >{{ selectionTextParts.suffix }}
        </span>
        <span
          v-for="(action, index) in operationActions"
          :key="action.key"
          class="sbux-table-toolbar__operation-action"
          :class="
            index < 4
              ? `sbux-table-toolbar__operation-action--priority-${index + 1}`
              : 'sbux-table-toolbar__operation-action--overflow'
          "
        >
          <Tooltip
            :content="actionDisabledReason(action) ?? ''"
            :disabled="!isActionDisabled(action) || !actionDisabledReason(action)"
          >
            <span>
              <Button
                class="sbux-table-toolbar__operation-button"
                :type="action.type ?? 'outline'"
                :status="action.status"
                :loading="action.loading"
                :disabled="isActionDisabled(action)"
                @click="handleOperation(action, 'operation')"
              >
                <template v-if="action.icon" #icon><component :is="action.icon" /></template>
                {{ action.label }}
              </Button>
            </span>
          </Tooltip>
        </span>
        <span
          v-for="menu in overflowMenus"
          :key="menu.variant"
          class="sbux-table-toolbar__more-group"
          :class="`sbux-table-toolbar__more-group--${menu.variant}`"
        >
          <Dropdown
            trigger="click"
            position="bl"
            :disabled="isOverflowMenuDisabled(menu.actions)"
            @select="(key) => handleMoreSelect(key, menu.actions)"
          >
            <Button
              class="sbux-table-toolbar__more"
              type="outline"
              :disabled="isOverflowMenuDisabled(menu.actions)"
            >
              {{ menu.variant === 'compact' ? texts.batchActions : texts.more }} <IconDown />
            </Button>
            <template #content>
              <Doption
                v-for="action in menu.actions"
                :key="action.key"
                :value="action.key"
                :disabled="isActionDisabled(action)"
                :title="isActionDisabled(action) ? actionDisabledReason(action) : undefined"
              >
                <span class="sbux-table-toolbar__menu-content">
                  <span v-if="action.icon" class="sbux-table-toolbar__menu-icon">
                    <component :is="action.icon" />
                  </span>
                  <span>{{ action.label }}</span>
                </span>
              </Doption>
            </template>
          </Dropdown>
        </span>
      </div>
      <div
        v-if="startQuickFilters.length > 0"
        class="sbux-table-toolbar__quick-filters sbux-table-toolbar__quick-filters--start"
      >
        <div
          v-for="filter in startQuickFilters"
          :key="filter.name"
          class="sbux-table-toolbar__quick-filter"
          :data-filter-name="filter.name"
          :data-filter-type="filter.type"
          :style="getFilterStyle(filter)"
        >
          <Input
            v-if="filter.type === 'search'"
            :model-value="searchDrafts[filter.name] ?? ''"
            :placeholder="filter.placeholder"
            :allow-clear="filter.allowClear ?? true"
            :max-length="filter.maxLength"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            @update:model-value="(value) => handleSearchInput(filter, value)"
            @press-enter="(event) => handleSearchSubmit(filter, event)"
          >
            <template #prefix><IconSearch /></template>
          </Input>
          <Select
            v-else-if="filter.type === 'select'"
            :model-value="getPrimitiveFilterValue(filter.name)"
            :options="[...filter.options]"
            :placeholder="filter.placeholder"
            :allow-clear="filter.allowClear ?? true"
            :loading="filter.loading"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            popup-container="body"
            @change="(value) => handleImmediateFilterChange(filter, value)"
          />
          <RadioGroup
            v-else-if="filter.type === 'buttonGroup'"
            class="arco-radio-group-variant-default-filled"
            type="button"
            :model-value="getPrimitiveFilterValue(filter.name)"
            :options="[...filter.options]"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            @change="(value) => handleImmediateFilterChange(filter, value)"
          />
          <RangePicker
            v-else
            :model-value="getDateRangeFilterValue(filter.name)"
            :placeholder="filter.placeholder"
            :format="filter.format"
            :value-format="filter.valueFormat ?? DEFAULT_TABLE_TOOLBAR_DATE_FORMAT"
            :allow-clear="filter.allowClear ?? true"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            popup-container="body"
            @change="(value) => handleImmediateFilterChange(filter, value)"
          />
        </div>
      </div>
    </div>

    <div v-if="endQuickFilters.length > 0 || hasTableTools" class="sbux-table-toolbar__controls">
      <div
        v-if="endQuickFilters.length > 0"
        class="sbux-table-toolbar__quick-filters sbux-table-toolbar__quick-filters--end"
      >
        <div
          v-for="filter in endQuickFilters"
          :key="filter.name"
          class="sbux-table-toolbar__quick-filter"
          :data-filter-name="filter.name"
          :data-filter-type="filter.type"
          :style="getFilterStyle(filter)"
        >
          <Input
            v-if="filter.type === 'search'"
            :model-value="searchDrafts[filter.name] ?? ''"
            :placeholder="filter.placeholder"
            :allow-clear="filter.allowClear ?? true"
            :max-length="filter.maxLength"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            @update:model-value="(value) => handleSearchInput(filter, value)"
            @press-enter="(event) => handleSearchSubmit(filter, event)"
          >
            <template #prefix><IconSearch /></template>
          </Input>
          <Select
            v-else-if="filter.type === 'select'"
            :model-value="getPrimitiveFilterValue(filter.name)"
            :options="[...filter.options]"
            :placeholder="filter.placeholder"
            :allow-clear="filter.allowClear ?? true"
            :loading="filter.loading"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            popup-container="body"
            @change="(value) => handleImmediateFilterChange(filter, value)"
          />
          <RadioGroup
            v-else-if="filter.type === 'buttonGroup'"
            class="arco-radio-group-variant-default-filled"
            type="button"
            :model-value="getPrimitiveFilterValue(filter.name)"
            :options="[...filter.options]"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            @change="(value) => handleImmediateFilterChange(filter, value)"
          />
          <RangePicker
            v-else
            :model-value="getDateRangeFilterValue(filter.name)"
            :placeholder="filter.placeholder"
            :format="filter.format"
            :value-format="filter.valueFormat ?? DEFAULT_TABLE_TOOLBAR_DATE_FORMAT"
            :allow-clear="filter.allowClear ?? true"
            :disabled="disabled || filter.disabled"
            :aria-label="getFilterAriaLabel(filter)"
            popup-container="body"
            @change="(value) => handleImmediateFilterChange(filter, value)"
          />
        </div>
      </div>
      <div v-if="hasTableTools" class="sbux-table-toolbar__tools">
        <Tooltip v-for="name in visibleToolNames" :key="name" :content="toolTooltip(name)">
          <span>
            <Button
              class="sbux-table-toolbar__tool"
              :class="`sbux-table-toolbar__tool--${name}`"
              type="outline"
              shape="square"
              :aria-label="getToolConfig(name)?.ariaLabel ?? toolText(name)"
              :loading="getToolConfig(name)?.loading"
              :disabled="isToolDisabled(name)"
              @click="handleTool(name)"
            >
              <template #icon><component :is="toolIcon(name)" /></template>
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
