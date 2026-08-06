import { createPortal } from 'react-dom'
import { Button, Card, Dropdown, Menu, Message, Table, Timeline } from '@sbux/starbucks-design-react'
import {
  DetailDescriptions,
  DetailPageLayout,
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
        <Button>更多</Button>
      </Dropdown>
      <Button type="primary" onClick={() => Message.success('进入卡券编辑')}>编辑</Button>
    </>
  )
}

export default function Demo() {
  const actionHost = typeof document === 'undefined'
    ? null
    : document.querySelector<HTMLElement>('[data-template-action-host="card-detail"]')

  return (
    <>
      {actionHost && createPortal(
        <div className="sb-card-detail-page__breadcrumb-actions">
          <DetailActions />
        </div>,
        actionHost,
      )}

      <div className="sb-card-detail-page sb-template-page-surface">
        <DetailPageLayout>
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
