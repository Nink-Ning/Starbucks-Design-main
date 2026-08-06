import { useEffect, useRef, useState } from 'react'
import { Descriptions } from '@arco-design/web-react'
import type { DetailDescriptionsProps } from './interface'

function resolveColumn(width: number) {
  if (width <= 720) return 1
  if (width <= 1200) return 2
  return 3
}

function isEmptyValue(value: unknown) {
  return value == null || value === '' || value === '--'
}

function useContainerColumn(column?: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [autoColumn, setAutoColumn] = useState(3)

  useEffect(() => {
    if (column !== undefined) {
      setAutoColumn(column)
      return
    }

    const element = containerRef.current
    if (!element) return

    const update = (width: number) => {
      if (width > 0) setAutoColumn(resolveColumn(width))
    }

    update(element.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width !== undefined) update(width)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [column])

  return { containerRef, resolvedColumn: column ?? autoColumn }
}

export function DetailDescriptions(props: DetailDescriptionsProps) {
  const {
    data,
    emptyValue,
    column,
    className,
    style,
    ...descriptionsProps
  } = props
  const { containerRef, resolvedColumn } = useContainerColumn(column)
  const classes = [
    'sbux-pro-detail-descriptions',
    ...(Array.isArray(className) ? className : [className]),
  ]
    .filter(Boolean)
    .join(' ')
  const normalizedData = data?.map((item) => ({
    ...item,
    ...(emptyValue !== undefined && isEmptyValue(item.value) ? { value: emptyValue } : {}),
  }))

  return (
    <div ref={containerRef} className={classes} style={style}>
      <Descriptions
        {...descriptionsProps}
        column={resolvedColumn}
        data={normalizedData}
      />
    </div>
  )
}
