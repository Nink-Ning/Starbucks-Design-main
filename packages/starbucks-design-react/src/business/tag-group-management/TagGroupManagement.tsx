import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Button, Empty, Input, Popconfirm, Popover, Spin, Tooltip } from '@arco-design/web-react'
import { IconDelete, IconEdit, IconPlus, IconSearch } from '@arco-design/web-react/icon/index.js'
import type { TagGroupItem, TagGroupManagementProps, TagGroupManagementTexts } from './interface'
import { resolveEmptyContext } from './search'
import {
  getDeleteTarget,
  resolveTagGroupDeleteConfirm,
  useTagGroupManagement,
  type TagGroupOperationState
} from './use-tag-group-management'
import { getNavigableGroupIds, isGroupActivationKey, resolveKeyboardFocusTarget } from './selection'
import { resolveGroupPermissions } from './permissions'

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const getBodyPopupContainer = (node: HTMLElement): Element => node.ownerDocument.body

const operationErrorText = (error: TagGroupOperationState['error'], texts: TagGroupManagementTexts) => {
  if (error === 'required') return texts.nameRequired
  if (error === 'duplicate') return texts.nameDuplicate
  if (error === 'tooLong') return texts.nameTooLong
  return undefined
}

export const TagGroupManagement = (props: TagGroupManagementProps) => {
  const state = useTagGroupManagement(props)
  const idPrefix = useId().replace(/:/g, '')
  const [focusGroupId, setFocusGroupId] = useState<string | null>(null)
  const groupButtonRefs = useRef(new Map<string, HTMLButtonElement>())
  const inputRef = useRef<{ focus: () => void; blur: () => void; dom: HTMLInputElement } | null>(null)
  const lastOperationTriggerRef = useRef<HTMLElement | null>(null)
  const deleteSourceRef = useRef<'itemClick' | 'keyboard'>('itemClick')
  const previousOperationRef = useRef<TagGroupOperationState | null>(null)
  const operation = state.operation
  const isManagementDisabled = Boolean(props.loading || props.disabled)

  const navigableGroupIds = useMemo(() => getNavigableGroupIds(state.visibleGroups), [state.visibleGroups])
  const fallbackFocusGroupId =
    state.activeGroup && !state.activeGroup.disabled ? state.activeGroup.id : (navigableGroupIds[0] ?? null)
  const currentFocusGroupId =
    focusGroupId && navigableGroupIds.includes(focusGroupId) ? focusGroupId : fallbackFocusGroupId

  useEffect(() => {
    if (focusGroupId && !navigableGroupIds.includes(focusGroupId)) {
      setFocusGroupId(fallbackFocusGroupId)
    }
  }, [fallbackFocusGroupId, focusGroupId, navigableGroupIds])

  useEffect(() => {
    const previousOperation = previousOperationRef.current
    previousOperationRef.current = operation
    if (previousOperation && !operation) {
      const trigger = lastOperationTriggerRef.current
      if (trigger && trigger.isConnected) {
        trigger.focus()
      } else if (currentFocusGroupId) {
        groupButtonRefs.current.get(currentFocusGroupId)?.focus()
      }
      lastOperationTriggerRef.current = null
    }
  }, [currentFocusGroupId, operation])

  useEffect(() => {
    if (operation?.type === 'create' || operation?.type === 'rename') {
      inputRef.current?.focus()
    }
  }, [operation?.type])

  const getGroupButtonId = (groupId: string) => `${idPrefix}-group-${groupId}`
  const contentId = `${idPrefix}-content`
  const activeLabelId = `${idPrefix}-active-label`
  const activeButtonIsVisible =
    state.activeGroupId !== null && state.visibleGroups.some((group) => group.id === state.activeGroupId)

  const setGroupButtonRef = (groupId: string, element: HTMLButtonElement | null) => {
    if (element) {
      groupButtonRefs.current.set(groupId, element)
    } else {
      groupButtonRefs.current.delete(groupId)
    }
  }

  const moveFocus = (groupId: string | null) => {
    if (!groupId) return
    setFocusGroupId(groupId)
    groupButtonRefs.current.get(groupId)?.focus()
  }

  const handleGroupKeyDown = (event: KeyboardEvent<HTMLButtonElement>, group: TagGroupItem) => {
    if (isManagementDisabled || group.disabled) return

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      moveFocus(resolveKeyboardFocusTarget(state.visibleGroups, group.id, event.key))
      return
    }

    if (isGroupActivationKey(event.key)) {
      event.preventDefault()
      state.selectGroup(group.id, 'keyboard')
    }
  }

  const getDeleteOptions = () => {
    const group = getDeleteTarget(operation, state.effectiveGroups)
    if (!group) return { title: '', content: '', okText: state.texts.confirm, cancelText: state.texts.cancel }
    const options = resolveTagGroupDeleteConfirm(props.deleteConfirm, group)
    return {
      title: options.title ?? '删除标签组',
      content: options.content ?? `确认删除「${group.name}」？`,
      okText: options.okText ?? state.texts.confirm,
      cancelText: options.cancelText ?? state.texts.cancel
    }
  }

  const getOperationInput = () => {
    if (!operation || (operation.type !== 'create' && operation.type !== 'rename')) return null
    const errorText = operationErrorText(operation.error, state.texts)
    return (
      <div className="sbux-tag-group-management-operation sbux-tag-group-management__operation-form">
        <label className="sbux-tag-group-management__visually-hidden" htmlFor={`${idPrefix}-operation-input`}>
          {operation.type === 'create' ? state.texts.create : state.texts.rename}
        </label>
        <Input
          ref={inputRef}
          className="sbux-tag-group-management__operation-input"
          id={`${idPrefix}-operation-input`}
          value={operation.value}
          status={errorText ? 'error' : undefined}
          onChange={state.setOperationValue}
          onPressEnter={() => state.submitOperation('keyboard')}
          aria-invalid={errorText ? 'true' : undefined}
          aria-describedby={errorText ? `${idPrefix}-operation-error` : undefined}
        />
        {errorText && (
          <div id={`${idPrefix}-operation-error`} className="sbux-tag-group-management__operation-error" role="alert">
            {errorText}
          </div>
        )}
        <div className="sbux-tag-group-management__operation-actions">
          <Button size="mini" onClick={() => state.closeOperation()}>
            {state.texts.cancel}
          </Button>
          <Button size="mini" type="primary" onClick={() => state.submitOperation('itemClick')}>
            {state.texts.confirm}
          </Button>
        </div>
      </div>
    )
  }

  const renderCreate = () => {
    if (!props.allowCreate && props.allowCreate !== undefined) return null
    const permission = resolveGroupPermissions(null, {
      loading: props.loading,
      disabled: props.disabled,
      allowCreate: props.allowCreate
    }).create
    if (!permission.visible) return null
    return (
      <Popover
        trigger="click"
        position="bottom"
        popupVisible={operation?.type === 'create'}
        onVisibleChange={(visible) => (visible ? state.openCreate() : state.closeOperation())}
        getPopupContainer={getBodyPopupContainer}
        content={getOperationInput()}
      >
        <Button
          className="sbux-tag-group-management__create"
          type="text"
          size="mini"
          icon={<IconPlus />}
          aria-label={state.texts.create}
          disabled={isManagementDisabled}
          onClick={(event) => {
            lastOperationTriggerRef.current = event.currentTarget as HTMLElement
          }}
        />
      </Popover>
    )
  }

  const renderGroupActions = (group: TagGroupItem) => {
    const permissions = resolveGroupPermissions(group, {
      loading: props.loading,
      disabled: props.disabled,
      allowRename: props.allowRename,
      allowDelete: props.allowDelete
    })
    if (!permissions.rename.visible && !permissions.delete.visible) return null

    return (
      <div className="sbux-tag-group-management__actions" onClick={(event) => event.stopPropagation()}>
        {permissions.rename.visible && (
          <Popover
            trigger="click"
            position="bottom"
            popupVisible={operation?.type === 'rename' && operation.groupId === group.id}
            onVisibleChange={(visible) => (visible ? state.openRename(group) : state.closeOperation())}
            getPopupContainer={getBodyPopupContainer}
            content={getOperationInput()}
          >
            <Button
              className="sbux-tag-group-management__action-button"
              type="text"
              size="mini"
              icon={<IconEdit />}
              aria-label={`${state.texts.rename}${group.name}`}
              disabled={permissions.rename.disabled}
              onClick={(event) => {
                lastOperationTriggerRef.current = event.currentTarget as HTMLElement
              }}
            />
          </Popover>
        )}
        {permissions.delete.visible && (
          <Tooltip disabled={!permissions.delete.disabledReason} content={permissions.delete.disabledReason}>
            <span>
              <Popconfirm
                trigger="click"
                position="bottom"
                popupVisible={operation?.type === 'delete' && operation.groupId === group.id}
                onVisibleChange={(visible) => (visible ? state.openDelete(group) : state.closeOperation())}
                onOk={() => {
                  const source = deleteSourceRef.current
                  deleteSourceRef.current = 'itemClick'
                  state.confirmDelete(source)
                }}
                getPopupContainer={getBodyPopupContainer}
                autoFocus
                focusLock
                {...getDeleteOptions()}
              >
                <Button
                  className="sbux-tag-group-management__action-button"
                  type="text"
                  size="mini"
                  icon={<IconDelete />}
                  aria-label={`删除${group.name}`}
                  disabled={permissions.delete.disabled}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      deleteSourceRef.current = 'keyboard'
                    }
                  }}
                  onClick={(event) => {
                    if (deleteSourceRef.current !== 'keyboard') {
                      deleteSourceRef.current = 'itemClick'
                    }
                    lastOperationTriggerRef.current = event.currentTarget as HTMLElement
                  }}
                />
              </Popconfirm>
            </span>
          </Tooltip>
        )}
      </div>
    )
  }

  const emptyContext = resolveEmptyContext(state.effectiveGroups, state.visibleGroups, state.searchKeyword)

  return (
    <div
      className={cx('sbux-tag-group-management', props.className)}
      style={props.style}
      data-loading={props.loading ? 'true' : 'false'}
      data-disabled={props.disabled ? 'true' : 'false'}
    >
      <aside className="sbux-tag-group-management__sidebar">
        <div className="sbux-tag-group-management__header">
          <h2 className="sbux-tag-group-management__title">{state.texts.title}</h2>
        </div>
        <div className="sbux-tag-group-management__search-row">
          {props.searchable !== false && (
            <Input
              className="sbux-tag-group-management__search-input"
              value={state.searchKeyword}
              placeholder={state.texts.searchPlaceholder}
              prefix={<IconSearch />}
              allowClear
              aria-label={state.texts.searchPlaceholder}
              disabled={isManagementDisabled}
              onChange={state.setSearchKeyword}
            />
          )}
          {renderCreate()}
        </div>
        <div className="sbux-tag-group-management__list-region" aria-busy={props.loading ? 'true' : undefined}>
          {props.loading ? (
            <div className="sbux-tag-group-management__loading" role="status">
              <Spin loading>
                <span className="sbux-tag-group-management__visually-hidden">Loading</span>
              </Spin>
            </div>
          ) : emptyContext ? (
            <div className="sbux-tag-group-management__empty">
              {props.renderEmpty ? (
                props.renderEmpty(emptyContext)
              ) : (
                <Empty description={emptyContext.type === 'empty' ? state.texts.empty : state.texts.searchEmpty} />
              )}
            </div>
          ) : (
            <ul className="sbux-tag-group-management__list" role="list">
              {state.visibleGroups.map((group) => {
                const groupButtonId = getGroupButtonId(group.id)
                const isActive = state.activeGroupId === group.id
                const isDisabled = isManagementDisabled || Boolean(group.disabled)
                return (
                  <li
                    key={group.id}
                    className="sbux-tag-group-management__item"
                    data-active={isActive ? 'true' : 'false'}
                    data-disabled={isDisabled ? 'true' : 'false'}
                  >
                    <button
                      ref={(element) => setGroupButtonRef(group.id, element)}
                      id={groupButtonId}
                      type="button"
                      className="sbux-tag-group-management__select"
                      disabled={isDisabled}
                      aria-disabled={isDisabled ? 'true' : undefined}
                      aria-current={isActive ? 'true' : undefined}
                      aria-controls={isActive ? contentId : undefined}
                      tabIndex={currentFocusGroupId === group.id ? 0 : -1}
                      onClick={() => state.selectGroup(group.id, 'itemClick')}
                      onFocus={() => setFocusGroupId(group.id)}
                      onKeyDown={(event) => handleGroupKeyDown(event, group)}
                    >
                      <Tooltip content={group.name}>
                        <span className="sbux-tag-group-management__name">{group.name}</span>
                      </Tooltip>
                    </button>
                    {renderGroupActions(group)}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </aside>
      <section
        id={contentId}
        className="sbux-tag-group-management__content"
        aria-labelledby={
          activeButtonIsVisible
            ? getGroupButtonId(state.activeGroupId as string)
            : state.activeGroup
              ? activeLabelId
              : undefined
        }
        aria-label={state.activeGroupId === null ? state.texts.title : undefined}
      >
        {state.activeGroup && !activeButtonIsVisible && (
          <span id={activeLabelId} className="sbux-tag-group-management__visually-hidden">
            {state.activeGroup.name}
          </span>
        )}
        {props.renderContent?.({ activeGroupId: state.activeGroupId, activeGroup: state.activeGroup })}
      </section>
    </div>
  )
}
