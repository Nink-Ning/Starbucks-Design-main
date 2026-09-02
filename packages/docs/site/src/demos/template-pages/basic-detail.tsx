import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, Dropdown, Menu, Message } from '@sbux/starbucks-design-react'
import {
  DetailDescriptions,
  DetailPageLayout,
  DetailSection,
  PageHeader,
} from '@sbux/starbucks-design-react/pro'
import {
  couponBasicInfo,
  couponBasicInfoColumns,
  DETAIL_LABEL_VALUE_GAP,
  DETAIL_EMPTY_VALUE,
} from './detail.shared'

export default function Demo() {
  const labelProbeRef = useRef<HTMLDivElement>(null)
  const [labelWidth, setLabelWidth] = useState<number>()

  useEffect(() => {
    const labels = labelProbeRef.current?.querySelectorAll<HTMLElement>('[data-detail-label-probe]')
    if (!labels?.length) return
    setLabelWidth(Math.max(...Array.from(labels, label => label.getBoundingClientRect().width)))
  }, [])

  const labelStyle = labelWidth === undefined
    ? undefined
    : {
        boxSizing: 'content-box' as const,
        width: labelWidth,
        paddingRight: DETAIL_LABEL_VALUE_GAP,
      }
  const pageHeader = (
    <PageHeader
      title="卡券详情"
      helpText="查看卡券的只读信息"
      backable
      onBack={() => Message.info('返回卡券列表')}
      extra={(
        <div className="sb-basic-detail-page__breadcrumb-actions">
          <Dropdown
            droplist={
              <Menu onClickMenuItem={(key) => Message.info(key === 'copy' ? '已复制卡券' : '已导出卡券')}>
                <Menu.Item key="copy">复制卡券</Menu.Item>
                <Menu.Item key="export">导出卡券</Menu.Item>
              </Menu>
            }
          >
            <Button type="outline">更多</Button>
          </Dropdown>
          <Button type="primary" onClick={() => Message.success('进入卡券编辑')}>编辑</Button>
        </div>
      )}
    />
  )
  const pageHeaderHost = typeof document === 'undefined'
    ? null
    : document.querySelector('[data-template-page-header-host="basic-detail"]')

  return (
    <div className="sb-basic-detail-page sb-template-page-surface">
      {pageHeaderHost ? createPortal(pageHeader, pageHeaderHost) : null}
      <DetailPageLayout maxWidth={1120}>
        {!pageHeaderHost && pageHeader}
        <div className="sb-basic-detail-page__content">
          <DetailSection>
            <div ref={labelProbeRef} className="sb-basic-detail-page__label-probe" aria-hidden="true">
              {couponBasicInfo.map(item => <span key={item.label} data-detail-label-probe>{item.label}</span>)}
            </div>
            <div className="sb-basic-detail-page__wide-descriptions">
              {couponBasicInfoColumns.map((column, index) => (
                <DetailDescriptions
                  key={index}
                  data={column}
                  column={1}
                  tableLayout="auto"
                  labelStyle={labelStyle}
                  emptyValue={DETAIL_EMPTY_VALUE}
                />
              ))}
            </div>
            <div className="sb-basic-detail-page__narrow-descriptions">
              <DetailDescriptions
                data={couponBasicInfo}
                column={1}
                tableLayout="auto"
                labelStyle={labelStyle}
                emptyValue={DETAIL_EMPTY_VALUE}
              />
            </div>
          </DetailSection>
        </div>
      </DetailPageLayout>
    </div>
  )
}
