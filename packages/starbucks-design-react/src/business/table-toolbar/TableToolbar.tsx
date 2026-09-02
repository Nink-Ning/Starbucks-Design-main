import type { CSSProperties, ReactNode } from 'react'
import { Button, DatePicker, Dropdown, Input, Menu, Select, Tooltip } from '@arco-design/web-react'
import { IconDown, IconExport, IconRefresh, IconSearch, IconSettings } from '@arco-design/web-react/icon/index.js'
import { Radio } from '../../radio'
import type {
  TableToolbarAction,
  TableToolbarProps,
  TableToolbarQuickFilter,
  TableToolbarToolConfig,
  TableToolbarToolName
} from './interface'
import { DEFAULT_TABLE_TOOLBAR_DATE_FORMAT, getToolbarOverflowActions, normalizeToolConfig } from './normalize'
import { useTableToolbar } from './use-table-toolbar'

const { RangePicker } = DatePicker

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

const defaultFilterWidth = (filter: TableToolbarQuickFilter) => {
  if (filter.type === 'search') return 250
  if (filter.type === 'select') return 180
  if (filter.type === 'dateRange') return 320
  return 'auto'
}

const filterStyle = (filter: TableToolbarQuickFilter) =>
  ({
    '--sbux-table-toolbar-filter-width':
      typeof (filter.width ?? defaultFilterWidth(filter)) === 'number'
        ? `${filter.width ?? defaultFilterWidth(filter)}px`
        : String(filter.width ?? defaultFilterWidth(filter))
  }) as CSSProperties

const getBodyPopupContainer = () => document.body

export const TableToolbar = (props: TableToolbarProps) => {
  const state = useTableToolbar(props)

  if (!state.hasContent) return null

  const startQuickFilters = state.quickFilters.filter((filter) => filter.placement === 'start')
  const endQuickFilters = state.quickFilters.filter((filter) => filter.placement !== 'start')
  const hasOperationArea = state.selectedCount > 0 || state.operationActions.length > 0 || state.moreActions.length > 0
  const hasStartContent = hasOperationArea || startQuickFilters.length > 0
  const selectionText = state.texts.selected(state.selectedCount)
  const selectionCountText = String(state.selectedCount)
  const selectionCountIndex = selectionText.indexOf(selectionCountText)

  const renderSelectionText = () =>
    selectionCountIndex >= 0 ? (
      <>
        {selectionText.slice(0, selectionCountIndex)}
        <strong className="sbux-table-toolbar__selection-count">{selectionCountText}</strong>
        {selectionText.slice(selectionCountIndex + selectionCountText.length)}
      </>
    ) : (
      selectionText
    )

  const actionDisabledReason = (action: TableToolbarAction) => {
    if (action.disabledReason) return action.disabledReason
    if (action.requiresSelection && state.selectedCount === 0) return state.texts.selectionRequired
    return undefined
  }
  const isActionDisabled = (action: TableToolbarAction) =>
    Boolean(
      props.disabled || action.disabled || action.loading || (action.requiresSelection && state.selectedCount === 0)
    )

  const handleOperation = (action: TableToolbarAction, source: 'operation' | 'more') => {
    if (isActionDisabled(action)) return
    props.onOperation?.(action.key, { source, selectedCount: state.selectedCount })
  }

  const renderOperationButton = (action: TableToolbarAction, index: number) => {
    const priorityClass =
      index < 4
        ? `sbux-table-toolbar__operation-action--priority-${index + 1}`
        : 'sbux-table-toolbar__operation-action--overflow'
    const button = (
      <Button
        className="sbux-table-toolbar__operation-button"
        type={action.type ?? 'outline'}
        status={action.status === 'normal' ? 'default' : action.status}
        icon={action.icon}
        loading={action.loading}
        disabled={isActionDisabled(action)}
        onClick={() => handleOperation(action, 'operation')}
      >
        {action.label}
      </Button>
    )
    const reason = isActionDisabled(action) ? actionDisabledReason(action) : undefined
    return reason ? (
      <Tooltip key={action.key} content={reason}>
        <span className={`sbux-table-toolbar__operation-action ${priorityClass}`}>{button}</span>
      </Tooltip>
    ) : (
      <span key={action.key} className={`sbux-table-toolbar__operation-action ${priorityClass}`}>
        {button}
      </span>
    )
  }

  const renderQuickFilter = (filter: TableToolbarQuickFilter) => {
    const disabled = Boolean(props.disabled || filter.disabled)
    const value = state.committedValues[filter.name]
    const common = {
      'aria-label':
        filter.ariaLabel ??
        (filter.type === 'search' || filter.type === 'select' ? filter.placeholder : undefined) ??
        filter.name,
      disabled
    }

    let control: ReactNode
    switch (filter.type) {
      case 'search':
        control = (
          <Input
            {...common}
            prefix={<IconSearch />}
            value={state.searchDrafts[filter.name] ?? ''}
            placeholder={filter.placeholder}
            allowClear={filter.allowClear ?? true}
            maxLength={filter.maxLength}
            onChange={(nextValue) => state.handleSearchInput(filter, nextValue)}
            onPressEnter={(event) => state.handleSearchSubmit(filter, event)}
          />
        )
        break
      case 'select':
        control = (
          <Select
            {...common}
            value={value as string | number | undefined}
            options={[...filter.options]}
            placeholder={filter.placeholder}
            allowClear={filter.allowClear ?? true}
            loading={filter.loading}
            dropdownMenuClassName="sbux-table-toolbar__popup sbux-table-toolbar__select-popup"
            onChange={(nextValue) => state.handleImmediateFilterChange(filter, nextValue)}
          />
        )
        break
      case 'buttonGroup':
        control = (
          <Radio.Group
            {...common}
            type="button"
            variant="default-filled"
            value={value as string | number | undefined}
            options={[...filter.options]}
            onChange={(nextValue) => state.handleImmediateFilterChange(filter, nextValue)}
          />
        )
        break
      case 'dateRange':
        control = (
          <RangePicker
            {...common}
            value={Array.isArray(value) ? (value as string[]) : undefined}
            placeholder={filter.placeholder}
            format={filter.format ?? filter.valueFormat ?? DEFAULT_TABLE_TOOLBAR_DATE_FORMAT}
            allowClear={filter.allowClear ?? true}
            getPopupContainer={getBodyPopupContainer}
            onChange={(dateString) => state.handleImmediateFilterChange(filter, dateString)}
          />
        )
        break
    }

    return (
      <div
        key={filter.name}
        className="sbux-table-toolbar__quick-filter"
        data-filter-name={filter.name}
        data-filter-type={filter.type}
        style={filterStyle(filter)}
      >
        {control}
      </div>
    )
  }

  const toolCallback = (name: TableToolbarToolName) => {
    if (name === 'export') return props.onExport
    if (name === 'columnSettings') return props.onColumnSettings
    return props.onRefresh
  }
  const toolText = (name: TableToolbarToolName) => state.texts[name]
  const toolIcon = (name: TableToolbarToolName) => {
    if (name === 'export') return <IconExport />
    if (name === 'columnSettings') return <IconSettings />
    return <IconRefresh />
  }
  const renderTool = (name: TableToolbarToolName) => {
    const config = normalizeToolConfig(props.tableTools?.[name])
    if (!config) return null
    const disabled = Boolean(props.disabled || config.disabled || config.loading)
    const label = config.ariaLabel ?? toolText(name)
    const button = (
      <Button
        className={`sbux-table-toolbar__tool sbux-table-toolbar__tool--${name}`}
        type="outline"
        shape="square"
        aria-label={label}
        icon={toolIcon(name)}
        loading={config.loading}
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          toolCallback(name)?.({
            source: name,
            selectedCount: state.selectedCount,
            quickFilterValues: state.committedValues
          })
        }}
      />
    )
    const tooltip = disabled && config.disabledReason ? config.disabledReason : (config.tooltip ?? toolText(name))
    return (
      <Tooltip key={name} content={tooltip}>
        <span>{button}</span>
      </Tooltip>
    )
  }

  const renderActionMenu = (actions: readonly TableToolbarAction[]) =>
    actions.length > 0 ? (
      <Menu
        onClickMenuItem={(key) => {
          const action = actions.find((item) => item.key === String(key))
          if (action) handleOperation(action, 'more')
        }}
      >
        {actions.map((action) => (
          <Menu.Item
            key={action.key}
            disabled={isActionDisabled(action)}
            title={isActionDisabled(action) ? actionDisabledReason(action) : undefined}
          >
            <span className="sbux-table-toolbar__menu-content">
              {action.icon && <span className="sbux-table-toolbar__menu-icon">{action.icon}</span>}
              <span>{action.label}</span>
            </span>
          </Menu.Item>
        ))}
      </Menu>
    ) : null

  const wideOverflowActions = getToolbarOverflowActions(state.operationActions, state.moreActions, 4)
  const standardOverflowActions = getToolbarOverflowActions(state.operationActions, state.moreActions, 2)
  const compactOverflowActions = getToolbarOverflowActions(state.operationActions, state.moreActions, 1)

  const renderMoreTrigger = (actions: readonly TableToolbarAction[], variant: 'wide' | 'standard' | 'compact') => {
    const menu = renderActionMenu(actions)
    const disabled = actions.every(isActionDisabled)
    return menu ? (
      <span className={`sbux-table-toolbar__more-group sbux-table-toolbar__more-group--${variant}`}>
        <Dropdown droplist={menu} trigger="click" position="bl" disabled={disabled}>
          <Button className="sbux-table-toolbar__more" type="outline" disabled={disabled}>
            {variant === 'compact' ? state.texts.batchActions : state.texts.more} <IconDown />
          </Button>
        </Dropdown>
      </span>
    ) : null
  }

  return (
    <div
      className={cx('sbux-table-toolbar', props.className)}
      style={props.style}
      role="toolbar"
      aria-label={props.ariaLabel ?? state.texts.ariaLabel}
      data-disabled={props.disabled ? 'true' : 'false'}
      data-has-selection={state.selectedCount > 0 ? 'true' : 'false'}
      data-has-operations={hasOperationArea ? 'true' : 'false'}
      data-has-start-content={hasStartContent ? 'true' : 'false'}
    >
      {hasStartContent && (
        <div className="sbux-table-toolbar__start">
          {hasOperationArea && (
            <div className="sbux-table-toolbar__operations">
              {state.selectedCount > 0 && (
                <span className="sbux-table-toolbar__selection" aria-live="polite">
                  {renderSelectionText()}
                </span>
              )}
              {state.operationActions.map(renderOperationButton)}
              {renderMoreTrigger(wideOverflowActions, 'wide')}
              {renderMoreTrigger(standardOverflowActions, 'standard')}
              {renderMoreTrigger(compactOverflowActions, 'compact')}
            </div>
          )}
          {startQuickFilters.length > 0 && (
            <div className="sbux-table-toolbar__quick-filters sbux-table-toolbar__quick-filters--start">
              {startQuickFilters.map(renderQuickFilter)}
            </div>
          )}
        </div>
      )}
      {(endQuickFilters.length > 0 || state.hasTableTools) && (
        <div className="sbux-table-toolbar__controls">
          {endQuickFilters.length > 0 && (
            <div className="sbux-table-toolbar__quick-filters sbux-table-toolbar__quick-filters--end">
              {endQuickFilters.map(renderQuickFilter)}
            </div>
          )}
          {state.hasTableTools && (
            <div className="sbux-table-toolbar__tools">
              {renderTool('export')}
              {renderTool('columnSettings')}
              {renderTool('refresh')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
