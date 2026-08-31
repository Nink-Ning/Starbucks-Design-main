import { createPortal } from 'react-dom'
import { Button, Card, Dropdown, Menu, Message, Table, Timeline } from '@sbux/starbucks-design-react'
import {
  DetailDescriptions,
  DetailPageLayout,
  PageHeader,
} from '@sbux/starbucks-design-react/pro'
import {
  couponActivityTimeline,
  couponBasicInfo,
  couponStoreScope,
  DETAIL_EMPTY_VALUE,
} from './detail.shared'

const scopeColumns = [
  { title: '范围', dataIndex: 'scope', width: 160 },
  { title: '类型', dataIndex: 'type', width: 100 },
  { title: '区域', dataIndex: 'area', width: 100 },
  { title: '说明', dataIndex: 'note', width: 240 },
]

function DetailActions() {
  return (
    <>
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
    </>
  )
}

export default function Demo() {
  const pageHeader = (
    <PageHeader
      title="卡券详情"
      helpText="查看卡券的基本信息、适用范围和操作记录"
      backable
      onBack={() => Message.info('返回卡券列表')}
      extra={(
        <div className="sb-card-detail-page__breadcrumb-actions">
          <DetailActions />
        </div>
      )}
    />
  )
  const pageHeaderHost = typeof document === 'undefined'
    ? null
    : document.querySelector<HTMLElement>('[data-template-page-header-host="card-detail"]')

  return (
    <>
      {pageHeaderHost && createPortal(pageHeader, pageHeaderHost)}

      <div className="sb-card-detail-page sb-template-page-surface">
        <DetailPageLayout>
          {!pageHeaderHost && pageHeader}
          <div className="sb-card-detail-page__cards">
            <Card className="sb-card-detail-page__card sb-card-detail-page__card--wide" title="基本信息">
              <DetailDescriptions data={couponBasicInfo} column={2} emptyValue={DETAIL_EMPTY_VALUE} />
            </Card>

            <Card className="sb-card-detail-page__card sb-card-detail-page__card--wide" title="适用范围">
              <div className="sb-card-detail-page__table">
                <Table
                  rowKey="scope"
                  columns={scopeColumns}
                  data={couponStoreScope}
                  pagination={false}
                  border={{ headerCell: true, cell: true }}
                  scroll={{ x: 600 }}
                />
              </div>
            </Card>

            <Card className="sb-card-detail-page__card sb-card-detail-page__card--wide" title="操作记录">
              <Timeline>
                {couponActivityTimeline.map((item) => (
                  <Timeline.Item key={item.label} label={item.label}>
                    {item.content}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </div>
        </DetailPageLayout>
      </div>
    </>
  )
}
