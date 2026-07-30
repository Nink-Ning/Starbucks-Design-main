import { useId } from 'react'
import { Button } from '@arco-design/web-react'
import { IconDown, IconUp } from '@arco-design/web-react/icon/index.js'
import { resolveResponsiveFieldSpans } from './layout'
import type { FilterBarProps } from './interface'
import { renderFilterFieldControl } from './adapters'
import { useFilterBar } from './use-filter-bar'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

export const FilterBar = (props: FilterBarProps) => {
  const state = useFilterBar(props)
  const idPrefix = useId().replace(/:/g, '')

  if (state.layout.eligibleFields.length === 0) {
    return null
  }

  const showExpandToggle = state.layout.collapsible && props.collapsible !== false
  const describedByIds = (fieldName: string, help?: string, hasError?: boolean) =>
    [
      help ? `${idPrefix}-${fieldName}-help` : undefined,
      hasError ? `${idPrefix}-${fieldName}-error` : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <div
      className={cx('sbux-filter-bar', props.className)}
      style={props.style}
      data-expanded={state.expanded ? 'true' : 'false'}
      data-collapsible={state.layout.collapsible ? 'true' : 'false'}
      data-loading={props.loading ? 'true' : 'false'}
      data-disabled={props.disabled ? 'true' : 'false'}
    >
      <div
        className="sbux-filter-bar__fields"
        data-columns-xs={state.columns.xs}
        data-columns-sm={state.columns.sm}
        data-columns-md={state.columns.md}
        data-columns-lg={state.columns.lg}
        data-columns-xl={state.columns.xl}
        data-columns-xxl={state.columns.xxl}
      >
        {state.layout.renderedFields.map((field) => {
          const error = state.errorsByName.get(field.name)
          const controlId = `${idPrefix}-${field.name}-control`
          const helpId = `${idPrefix}-${field.name}-help`
          const errorId = `${idPrefix}-${field.name}-error`
          const describedBy = describedByIds(field.name, field.help, Boolean(error))
          const fieldSpans = resolveResponsiveFieldSpans(field.span, state.columns)

          return (
            <div
              key={field.name}
              className="sbux-filter-bar__field"
              data-field-name={field.name}
              data-field-type={field.type}
              data-span={fieldSpans.xxl}
              data-span-xs={fieldSpans.xs}
              data-span-sm={fieldSpans.sm}
              data-span-md={fieldSpans.md}
              data-span-lg={fieldSpans.lg}
              data-span-xl={fieldSpans.xl}
              data-span-xxl={fieldSpans.xxl}
            >
              <label className="sbux-filter-bar__label" htmlFor={controlId}>
                {field.required && <span className="sbux-filter-bar__required">*</span>}
                <span className="sbux-filter-bar__label-text">{field.label}</span>
              </label>
              <div
                className="sbux-filter-bar__control"
                ref={(element) => state.registerControlElement(field.name, element)}
                tabIndex={-1}
              >
                {renderFilterFieldControl({
                  field,
                  value: state.draftValues[field.name],
                  disabled: state.isFieldDisabled(field),
                  error,
                  controlId,
                  describedBy,
                  renderField: props.renderField,
                  onChange: (value) => state.handleFieldChange(field, value),
                })}
              </div>
              {field.help && (
                <div className="sbux-filter-bar__help" id={helpId}>
                  {field.help}
                </div>
              )}
              {error && (
                <div className="sbux-filter-bar__error" id={errorId} role="alert">
                  {error.message}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="sbux-filter-bar__actions">
        {!state.expanded && state.hiddenActiveSummaryCount > 0 && (
          <span className="sbux-filter-bar__hidden-summary" aria-live="polite">
            {state.texts.hiddenActiveSummary(state.hiddenActiveSummaryCount)}
          </span>
        )}
        <div className="sbux-filter-bar__buttons">
          {state.showSubmit && (
            <Button
              className="sbux-filter-bar__submit"
              type="primary"
              loading={props.loading}
              disabled={state.isInteractiveDisabled}
              onClick={state.handleSubmit}
            >
              {state.texts.submit}
            </Button>
          )}
          {state.showReset && (
            <Button
              className="sbux-filter-bar__reset"
              disabled={state.isInteractiveDisabled}
              onClick={state.handleReset}
            >
              {state.texts.reset}
            </Button>
          )}
          {showExpandToggle && (
            <Button
              className="sbux-filter-bar__expand"
              type="text"
              icon={state.expanded ? <IconUp /> : <IconDown />}
              aria-label={state.expanded ? state.texts.collapse : state.texts.expand}
              aria-expanded={state.expanded}
              disabled={props.disabled}
              onClick={() => state.handleExpandedChange(!state.expanded)}
            >
              {state.expanded ? state.texts.collapse : state.texts.expand}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
