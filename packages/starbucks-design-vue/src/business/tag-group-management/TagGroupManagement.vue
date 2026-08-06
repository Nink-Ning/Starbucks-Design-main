<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { Button, Empty, Input, Popconfirm, Popover, Spin, Tooltip } from '@arco-design/web-vue'
import { IconDelete, IconEdit, IconPlus, IconSearch } from '@arco-design/web-vue/es/icon'
import type {
  TagGroupItem,
  TagGroupManagementEmits,
  TagGroupManagementProps,
  TagGroupManagementTexts
} from './interface'
import { resolveEmptyContext } from './search'
import { getNavigableGroupIds, isGroupActivationKey, resolveKeyboardFocusTarget } from './selection'
import { resolveGroupPermissions } from './permissions'
import {
  getDeleteTarget,
  resolveTagGroupDeleteConfirm,
  useTagGroupManagement,
  type TagGroupOperationState,
  type TagGroupManagementEmit
} from './use-tag-group-management'

const props = withDefaults(defineProps<TagGroupManagementProps>(), {
  searchable: true,
  loading: false,
  disabled: false,
  allowCreate: true,
  allowRename: true,
  allowDelete: true
})

const emit = defineEmits<TagGroupManagementEmits>() as TagGroupManagementEmit
const state = useTagGroupManagement(props, emit)
const { activeGroupId, activeGroup, visibleGroups, searchKeyword, texts, operation } = state

const idPrefix = `sbux-tag-group-management-${getCurrentInstance()?.uid ?? 0}`
const contentId = `${idPrefix}-content`
const activeLabelId = `${idPrefix}-active-label`
const operationInputId = `${idPrefix}-operation-input`
const popupContainer = typeof document === 'undefined' ? undefined : document.body

const focusGroupId = ref<string | null>(null)
const groupButtonRefs = new Map<string, HTMLButtonElement>()
const operationInputRef = ref<{ focus: () => void } | null>(null)
const lastOperationTrigger = ref<HTMLElement | null>(null)
const previousOperation = ref<TagGroupOperationState | null>(null)
const deleteSource = ref<'itemClick' | 'keyboard'>('itemClick')
const deleteKeyboardActivationPending = ref(false)

const isManagementDisabled = computed(() => Boolean(props.loading || props.disabled))
const navigableGroupIds = computed(() => getNavigableGroupIds(state.visibleGroups.value))
const fallbackFocusGroupId = computed(() => {
  if (state.activeGroup.value && !state.activeGroup.value.disabled) {
    return state.activeGroup.value.id
  }
  return navigableGroupIds.value[0] ?? null
})
const currentFocusGroupId = computed(() => {
  if (focusGroupId.value && navigableGroupIds.value.includes(focusGroupId.value)) {
    return focusGroupId.value
  }
  return fallbackFocusGroupId.value
})
const activeButtonIsVisible = computed(
  () =>
    state.activeGroupId.value !== null &&
    state.visibleGroups.value.some((group) => group.id === state.activeGroupId.value)
)
const emptyContext = computed(() =>
  resolveEmptyContext(state.effectiveGroups.value, state.visibleGroups.value, state.searchKeyword.value)
)

const operationErrorText = (error: TagGroupOperationState['error'], texts: TagGroupManagementTexts) => {
  if (error === 'required') return texts.nameRequired
  if (error === 'duplicate') return texts.nameDuplicate
  if (error === 'tooLong') return texts.nameTooLong
  return undefined
}

const getGroupButtonId = (groupId: string) => `${idPrefix}-group-${groupId}`

const setGroupButtonRef = (groupId: string, element: unknown) => {
  if (element && typeof (element as HTMLButtonElement).focus === 'function') {
    groupButtonRefs.set(groupId, element as HTMLButtonElement)
  } else {
    groupButtonRefs.delete(groupId)
  }
}

const moveFocus = (groupId: string | null) => {
  if (!groupId) return
  focusGroupId.value = groupId
  groupButtonRefs.get(groupId)?.focus()
}

const handleGroupKeyDown = (event: KeyboardEvent, group: TagGroupItem) => {
  if (isManagementDisabled.value || group.disabled) return

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    moveFocus(resolveKeyboardFocusTarget(state.visibleGroups.value, group.id, event.key))
    return
  }

  if (isGroupActivationKey(event.key)) {
    event.preventDefault()
    state.selectGroup(group.id, 'keyboard')
  }
}

const handleCreatePopupVisibleChange = (visible: boolean) => {
  if (visible) {
    state.openCreate()
  } else {
    state.closeOperation()
  }
}

const handleRenamePopupVisibleChange = (group: TagGroupItem, visible: boolean) => {
  if (visible) {
    state.openRename(group)
  } else {
    state.closeOperation()
  }
}

const handleDeletePopupVisibleChange = (group: TagGroupItem, visible: boolean) => {
  if (visible) {
    state.openDelete(group)
  } else {
    state.closeOperation()
  }
}

const setOperationTrigger = (event: MouseEvent, source: 'itemClick' | 'keyboard' = 'itemClick') => {
  lastOperationTrigger.value = event.currentTarget as HTMLElement
  deleteSource.value = source
}

const handleDeleteKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    deleteSource.value = 'keyboard'
    deleteKeyboardActivationPending.value = true
  }
}

const setDeleteOperationTrigger = (event: MouseEvent) => {
  lastOperationTrigger.value = event.currentTarget as HTMLElement
  if (!deleteKeyboardActivationPending.value) {
    deleteSource.value = 'itemClick'
  }
  deleteKeyboardActivationPending.value = false
}

const focusOperationInput = async () => {
  await nextTick()
  operationInputRef.value?.focus()
}

watch(
  () => state.operation.value,
  (operation) => {
    const previous = previousOperation.value
    previousOperation.value = operation

    if (operation?.type === 'create' || operation?.type === 'rename') {
      void focusOperationInput()
    }

    if (previous && !operation) {
      void nextTick(() => {
        if (lastOperationTrigger.value?.isConnected) {
          lastOperationTrigger.value.focus()
        } else if (currentFocusGroupId.value) {
          groupButtonRefs.get(currentFocusGroupId.value)?.focus()
        }
        lastOperationTrigger.value = null
      })
    }
  }
)

const getDeleteOptions = (group: TagGroupItem) => {
  const options = resolveTagGroupDeleteConfirm(props.deleteConfirm, group)
  return {
    title: options.title ?? '删除标签组',
    content: options.content ?? `确认删除「${group.name}」？`,
    okText: options.okText ?? state.texts.value.confirm,
    cancelText: options.cancelText ?? state.texts.value.cancel
  }
}

const getGroupPermissions = (group: TagGroupItem) =>
  resolveGroupPermissions(group, {
    loading: props.loading,
    disabled: props.disabled,
    allowRename: props.allowRename,
    allowDelete: props.allowDelete
  })
</script>

<template>
  <div
    class="sbux-tag-group-management"
    :data-loading="props.loading ? 'true' : 'false'"
    :data-disabled="props.disabled ? 'true' : 'false'"
  >
    <aside class="sbux-tag-group-management__sidebar">
      <div class="sbux-tag-group-management__header">
        <h2 class="sbux-tag-group-management__title">{{ texts.title }}</h2>
      </div>

      <div class="sbux-tag-group-management__search-row">
        <Input
          v-if="props.searchable"
          :model-value="searchKeyword"
          :placeholder="texts.searchPlaceholder"
          allow-clear
          :disabled="isManagementDisabled"
          :input-attrs="{ 'aria-label': texts.searchPlaceholder }"
          class="sbux-tag-group-management__search-input"
          @update:model-value="state.setSearchKeyword"
        >
          <template #prefix><IconSearch /></template>
        </Input>

        <Popover
          v-if="
            resolveGroupPermissions(null, {
              loading: props.loading,
              disabled: props.disabled,
              allowCreate: props.allowCreate
            }).create.visible
          "
          trigger="click"
          position="bottom"
          :popup-visible="operation?.type === 'create'"
          :popup-container="popupContainer"
          @popup-visible-change="handleCreatePopupVisibleChange"
        >
          <Button
            class="sbux-tag-group-management__create"
            type="text"
            size="mini"
            :disabled="isManagementDisabled"
            :aria-label="texts.create"
          >
            <template #icon><IconPlus /></template>
          </Button>
          <template #content>
            <div
              v-if="operation?.type === 'create'"
              class="sbux-tag-group-management-operation sbux-tag-group-management__operation-form"
            >
              <label class="sbux-tag-group-management__visually-hidden" :for="operationInputId">
                {{ texts.create }}
              </label>
              <Input
                :id="operationInputId"
                ref="operationInputRef"
                class="sbux-tag-group-management__operation-input"
                :model-value="operation.value"
                :error="Boolean(operationErrorText(operation.error, texts))"
                :input-attrs="{
                  'aria-invalid': operationErrorText(operation.error, texts) ? 'true' : undefined,
                  'aria-describedby': operationErrorText(operation.error, texts)
                    ? `${operationInputId}-error`
                    : undefined
                }"
                @update:model-value="state.setOperationValue"
                @press-enter="state.submitOperation('keyboard')"
              />
              <div
                v-if="operationErrorText(operation.error, texts)"
                :id="`${operationInputId}-error`"
                class="sbux-tag-group-management__operation-error"
                role="alert"
              >
                {{ operationErrorText(operation.error, texts) }}
              </div>
              <div class="sbux-tag-group-management__operation-actions">
                <Button size="mini" @click="state.closeOperation">{{ texts.cancel }}</Button>
                <Button size="mini" type="primary" @click="state.submitOperation('itemClick')">{{
                  texts.confirm
                }}</Button>
              </div>
            </div>
          </template>
        </Popover>
      </div>

      <div class="sbux-tag-group-management__list-region" :aria-busy="props.loading ? 'true' : undefined">
        <div v-if="props.loading" class="sbux-tag-group-management__loading" role="status">
          <Spin :loading="true">
            <span class="sbux-tag-group-management__visually-hidden">Loading</span>
          </Spin>
        </div>
        <template v-else-if="emptyContext">
          <div class="sbux-tag-group-management__empty">
            <slot name="empty" v-bind="emptyContext">
              <Empty :description="emptyContext.type === 'empty' ? texts.empty : texts.searchEmpty" />
            </slot>
          </div>
        </template>
        <ul v-else class="sbux-tag-group-management__list" role="list">
          <li
            v-for="group in visibleGroups"
            :key="group.id"
            class="sbux-tag-group-management__item"
            :data-active="activeGroupId === group.id ? 'true' : 'false'"
            :data-disabled="isManagementDisabled || group.disabled ? 'true' : 'false'"
          >
            <button
              :id="getGroupButtonId(group.id)"
              :ref="(element) => setGroupButtonRef(group.id, element)"
              type="button"
              class="sbux-tag-group-management__select"
              :disabled="isManagementDisabled || group.disabled"
              :aria-disabled="isManagementDisabled || group.disabled ? 'true' : undefined"
              :aria-label="group.name"
              :aria-current="activeGroupId === group.id ? 'true' : undefined"
              :aria-controls="activeGroupId === group.id ? contentId : undefined"
              :tabindex="currentFocusGroupId === group.id ? 0 : -1"
              @click="state.selectGroup(group.id, 'itemClick')"
              @focus="focusGroupId = group.id"
              @keydown="handleGroupKeyDown($event, group)"
            >
              <Tooltip :content="group.name">
                <span class="sbux-tag-group-management__name">{{ group.name }}</span>
              </Tooltip>
            </button>

            <div
              v-if="getGroupPermissions(group).rename.visible || getGroupPermissions(group).delete.visible"
              class="sbux-tag-group-management__actions"
            >
              <Popover
                v-if="getGroupPermissions(group).rename.visible"
                trigger="click"
                position="bottom"
                :popup-visible="operation?.type === 'rename' && operation.groupId === group.id"
                :popup-container="popupContainer"
                @popup-visible-change="handleRenamePopupVisibleChange(group, $event)"
              >
                <Button
                  class="sbux-tag-group-management__action-button"
                  type="text"
                  size="mini"
                  :disabled="getGroupPermissions(group).rename.disabled"
                  :aria-label="`${texts.rename}${group.name}`"
                  @click="setOperationTrigger($event)"
                >
                  <template #icon><IconEdit /></template>
                </Button>
                <template #content>
                  <div
                    v-if="operation?.type === 'rename' && operation.groupId === group.id"
                    class="sbux-tag-group-management-operation sbux-tag-group-management__operation-form"
                  >
                    <label class="sbux-tag-group-management__visually-hidden" :for="operationInputId">
                      {{ texts.rename }}
                    </label>
                    <Input
                      :id="operationInputId"
                      ref="operationInputRef"
                      class="sbux-tag-group-management__operation-input"
                      :model-value="operation.value"
                      :error="Boolean(operationErrorText(operation.error, texts))"
                      :input-attrs="{
                        'aria-invalid': operationErrorText(operation.error, texts) ? 'true' : undefined,
                        'aria-describedby': operationErrorText(operation.error, texts)
                          ? `${operationInputId}-error`
                          : undefined
                      }"
                      @update:model-value="state.setOperationValue"
                      @press-enter="state.submitOperation('keyboard')"
                    />
                    <div
                      v-if="operationErrorText(operation.error, texts)"
                      :id="`${operationInputId}-error`"
                      class="sbux-tag-group-management__operation-error"
                      role="alert"
                    >
                      {{ operationErrorText(operation.error, texts) }}
                    </div>
                    <div class="sbux-tag-group-management__operation-actions">
                      <Button size="mini" @click="state.closeOperation">{{ texts.cancel }}</Button>
                      <Button size="mini" type="primary" @click="state.submitOperation('itemClick')">{{
                        texts.confirm
                      }}</Button>
                    </div>
                  </div>
                </template>
              </Popover>

              <Tooltip
                :disabled="!getGroupPermissions(group).delete.disabledReason"
                :content="getGroupPermissions(group).delete.disabledReason"
              >
                <span>
                  <Popconfirm
                    v-if="getGroupPermissions(group).delete.visible"
                    v-bind="getDeleteOptions(group)"
                    type="warning"
                    position="bottom"
                    :popup-visible="operation?.type === 'delete' && operation.groupId === group.id"
                    :popup-container="popupContainer"
                    @popup-visible-change="handleDeletePopupVisibleChange(group, $event)"
                    @ok="state.confirmDelete(deleteSource)"
                    @cancel="state.closeOperation"
                  >
                    <Button
                      class="sbux-tag-group-management__action-button"
                      type="text"
                      size="mini"
                      :disabled="getGroupPermissions(group).delete.disabled"
                      :aria-label="`删除${group.name}`"
                      @keydown="handleDeleteKeyDown"
                      @click="setDeleteOperationTrigger"
                    >
                      <template #icon><IconDelete /></template>
                    </Button>
                  </Popconfirm>
                </span>
              </Tooltip>
            </div>
          </li>
        </ul>
      </div>
    </aside>

    <section
      :id="contentId"
      class="sbux-tag-group-management__content"
      :aria-labelledby="
        activeButtonIsVisible ? getGroupButtonId(activeGroupId as string) : activeGroup ? activeLabelId : undefined
      "
      :aria-label="activeGroupId === null ? texts.title : undefined"
    >
      <span
        v-if="activeGroup && !activeButtonIsVisible"
        :id="activeLabelId"
        class="sbux-tag-group-management__visually-hidden"
      >
        {{ activeGroup.name }}
      </span>
      <slot name="content" :active-group-id="activeGroupId" :active-group="activeGroup" />
    </section>
  </div>
</template>
