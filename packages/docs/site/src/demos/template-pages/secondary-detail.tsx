import { createPortal } from 'react-dom'
import { useMemo, useState } from 'react'
import { Button, Card, Dropdown, Menu, Message, Table, Tabs, Tag, Timeline } from '@sbux/starbucks-design-react'
import {
  DetailDescriptions,
  DetailPageLayout,
} from '@sbux/starbucks-design-react/pro'
import {
  secondaryActivityTimeline,
  secondaryBatchRows,
  secondaryParentSummary,
  secondaryRedemptionRows,
  secondaryStoreRows,
  secondaryTabLabels,
  type SecondaryTabKey,
} from './secondary-detail.shared'

const redemptionColumns = [
  { title: '核销时间', dataIndex: 'time', width: 160 },
  { title: '核销渠道', dataIndex: 'channel', width: 130 },
  { title: '城市', dataIndex: 'city', width: 90 },
  { title: '门店', dataIndex: 'store', width: 180 },
  { title: '会员', dataIndex: 'member', width: 120 },
  { title: '数量', dataIndex: 'quantity', width: 80 },
  { title: '状态', dataIndex: 'status', width: 100 },
]

const storeColumns = [
  { title: '范围', dataIndex: 'name', width: 180 },
  { title: '类型', dataIndex: 'type', width: 100 },
  { title: '区域', dataIndex: 'area', width: 100 },
  { title: '说明', dataIndex: 'note', width: 240 },
]

const batchColumns = [
  { title: '批次编号', dataIndex: 'id', width: 180 },
  { title: '批次名称', dataIndex: 'batch', width: 140 },
  { title: '创建时间', dataIndex: 'createdAt', width: 160 },
  { title: '发行数量', dataIndex: 'quantity', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 },
]

export default function Demo() {
  const [activeTab, setActiveTab] = useState<SecondaryTabKey>('redemptions')
  const activeTabLabel = secondaryTabLabels[activeTab]

  const actionHost = typeof document === 'undefined'
    ? null
    : document.querySelector<HTMLElement>('[data-template-action-host="secondary-detail"]')

  const panel = useMemo(() => {
    if (activeTab === 'redemptions') {
      return (
        <div className="sb-secondary-detail-page__table">
          <Table
            rowKey="id"
            columns={redemptionColumns}
            data={secondaryRedemptionRows}
            pagination={false}
            border={{ headerCell: true, cell: true }}
            scroll={{ x: 940 }}
          />
        </div>
      )
    }

    if (activeTab === 'stores') {
      return (
        <div className="sb-secondary-detail-page__table">
          <Table
            rowKey="id"
            columns={storeColumns}
            data={secondaryStoreRows}
            pagination={false}
            border={{ headerCell: true, cell: true }}
            scroll={{ x: 610 }}
          />
        </div>
      )
    }

    if (activeTab === 'batches') {
      return (
        <div className="sb-secondary-detail-page__table">
          <Table
            rowKey="id"
            columns={batchColumns}
            data={secondaryBatchRows}
            pagination={false}
            border={{ headerCell: true, cell: true }}
            scroll={{ x: 700 }}
          />
        </div>
      )
    }

    return (
      <Timeline>
        {secondaryActivityTimeline.map((item) => (
          <Timeline.Item key={item.label} label={item.label}>
            {item.content}
          </Timeline.Item>
        ))}
      </Timeline>
    )
  }, [activeTab])

  return (
    <>
      {actionHost && createPortal(
        <div className="sb-secondary-detail-page__breadcrumb-actions">
          <Dropdown
            droplist={
              <Menu onClickMenuItem={(key) => Message.info(key === 'copy' ? '已复制 QID' : '返回父级卡券')}>
                <Menu.Item key="copy">复制 QID</Menu.Item>
                <Menu.Item key="parent">查看父级卡券</Menu.Item>
              </Menu>
            }
          >
            <Button type="outline">更多</Button>
          </Dropdown>
          <Button type="primary" onClick={() => Message.success(`已导出${activeTabLabel}`)}>
            导出{activeTabLabel}
          </Button>
        </div>,
        actionHost,
      )}

      <div className="sb-secondary-detail-page sb-template-page-surface">
        <DetailPageLayout>
          <Card className="sb-secondary-detail-page__content">
            <div className="sb-secondary-detail-page__parent-summary">
              <DetailDescriptions data={secondaryParentSummary} emptyValue="—" />
            </div>
            <Tabs
              activeTab={activeTab}
              onChange={(key) => setActiveTab(key as SecondaryTabKey)}
              extra={<Button size="small" onClick={() => Message.info(`刷新${activeTabLabel}`)}>刷新当前内容</Button>}
            >
              <Tabs.TabPane key="redemptions" title="核销记录">{activeTab === 'redemptions' && panel}</Tabs.TabPane>
              <Tabs.TabPane key="stores" title="适用门店">{activeTab === 'stores' && panel}</Tabs.TabPane>
              <Tabs.TabPane key="batches" title="发行批次">{activeTab === 'batches' && panel}</Tabs.TabPane>
              <Tabs.TabPane key="activity" title="操作日志">{activeTab === 'activity' && panel}</Tabs.TabPane>
            </Tabs>
          </Card>
        </DetailPageLayout>
      </div>
    </>
  )
}
