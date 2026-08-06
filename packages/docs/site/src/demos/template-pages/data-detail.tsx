import { createPortal } from 'react-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Dropdown, Empty, Menu, Message, Select, Spin, Statistic, Table, Tag } from '@sbux/starbucks-design-react'
import {
  DetailDescriptions,
  DetailPageLayout,
} from '@sbux/starbucks-design-react/pro'
import {
  dataDetailChannelDistribution,
  dataDetailChannelLabels,
  dataDetailCityDistribution,
  dataDetailContext,
  dataDetailMetrics,
  dataDetailRedemptionRows,
  dataDetailWeeklyTrend,
  type DataDetailChannel,
  type DataDetailState,
} from './data-detail.shared'

type TimeRange = '12' | '4'

const redemptionColumns = [
  { title: '核销时间', dataIndex: 'time', width: 180 },
  { title: '渠道', dataIndex: 'channel', width: 120 },
  { title: '城市', dataIndex: 'city', width: 90 },
  { title: '门店', dataIndex: 'store', width: 150 },
  { title: '会员', dataIndex: 'member', width: 110 },
  { title: '数量', dataIndex: 'quantity', width: 80 },
  { title: '状态', dataIndex: 'status', width: 100 },
]

function TrendChart({
  data,
  empty,
}: {
  data: typeof dataDetailWeeklyTrend
  empty: boolean
}) {
  const width = 720
  const height = 240
  const left = 48
  const right = 16
  const top = 20
  const bottom = 38
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom
  const max = Math.max(...data.flatMap((item) => [item.issued, item.used]), 1)
  const x = (index: number) => left + (data.length === 1 ? plotWidth / 2 : (plotWidth * index) / (data.length - 1))
  const y = (value: number) => top + plotHeight - (value / max) * plotHeight
  const line = (key: 'issued' | 'used') => data.map((item, index) => `${x(index)},${y(item[key])}`).join(' ')

  if (empty) {
    return <Empty className="sb-data-detail-page__chart-empty" description="暂无趋势数据" />
  }

  return (
    <div className="sb-data-detail-chart">
      <svg
        className="sb-data-detail-chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="data-detail-trend-title data-detail-trend-desc"
      >
        <title id="data-detail-trend-title">近 12 周发券与核销趋势</title>
        <desc id="data-detail-trend-desc">蓝线表示每周发券数量，绿色线表示每周核销数量。</desc>
        <g className="sb-data-detail-chart__grid" aria-hidden="true">
          {[0, 0.5, 1].map((ratio) => (
            <line key={ratio} x1={left} x2={width - right} y1={top + plotHeight * ratio} y2={top + plotHeight * ratio} />
          ))}
        </g>
        <polyline className="sb-data-detail-chart__line sb-data-detail-chart__line--issued" points={line('issued')} />
        <polyline className="sb-data-detail-chart__line sb-data-detail-chart__line--used" points={line('used')} />
        <g className="sb-data-detail-chart__labels" aria-hidden="true">
          {data.map((item, index) => (
            <text key={item.label} x={x(index)} y={height - 12} textAnchor="middle">{item.label}</text>
          ))}
        </g>
      </svg>
      <div className="sb-data-detail-chart__legend" aria-hidden="true">
        <span><i className="sb-data-detail-chart__legend-dot sb-data-detail-chart__legend-dot--issued" />发券数量</span>
        <span><i className="sb-data-detail-chart__legend-dot sb-data-detail-chart__legend-dot--used" />使用数量</span>
      </div>
    </div>
  )
}

function DistributionList({
  items,
  empty,
  label,
}: {
  items: Array<{ label: string; percent: number; count: number }>
  empty: boolean
  label: string
}) {
  if (empty) {
    return <Empty className="sb-data-detail-page__distribution-empty" description={`暂无${label}数据`} />
  }

  return (
    <ul className="sb-data-detail-distribution" aria-label={label}>
      {items.map((item) => (
        <li key={item.label} className="sb-data-detail-distribution__item">
          <div className="sb-data-detail-distribution__header">
            <span>{item.label}</span>
            <span>{item.count.toLocaleString()} 张 · {item.percent}%</span>
          </div>
          <div
            className="sb-data-detail-distribution__track"
            role="progressbar"
            aria-label={`${item.label}占比`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={item.percent}
          >
            <span style={{ width: `${item.percent}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function DetailActions({ onRefresh }: { onRefresh: () => void }) {
  return (
    <>
      <Dropdown
        droplist={
          <Menu onClickMenuItem={() => Message.info('数据导出仅为示例行为')}>
            <Menu.Item key="export">导出数据</Menu.Item>
            <Menu.Item key="share">复制分析链接</Menu.Item>
          </Menu>
        }
      >
        <Button>更多</Button>
      </Dropdown>
      <Button onClick={onRefresh}>刷新数据</Button>
      <Button type="primary" onClick={() => Message.info('报表导出仅为示例行为')}>导出报表</Button>
    </>
  )
}

export default function Demo() {
  const [channel, setChannel] = useState<DataDetailChannel>('all')
  const [timeRange, setTimeRange] = useState<TimeRange>('12')
  const [dataState, setDataState] = useState<DataDetailState>('normal')
  const [isLoading, setIsLoading] = useState(false)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
  }, [])

  const refreshData = () => {
    if (loadingTimer.current) clearTimeout(loadingTimer.current)
    setIsLoading(true)
    loadingTimer.current = setTimeout(() => setIsLoading(false), 600)
  }

  const resetFilters = () => {
    setChannel('all')
    setTimeRange('12')
    setDataState('normal')
    setIsLoading(false)
  }

  const metrics = dataDetailMetrics[channel]
  const isEmpty = dataState === 'empty'
  const trendData = timeRange === '4' ? dataDetailWeeklyTrend.slice(-4) : dataDetailWeeklyTrend
  const visibleRows = useMemo(
    () => (channel === 'all' ? dataDetailRedemptionRows : dataDetailRedemptionRows.filter((row) => row.channel === channel)),
    [channel],
  )
  const visibleChannels = useMemo(() => {
    if (channel === 'all') return dataDetailChannelDistribution
    return dataDetailChannelDistribution
      .filter((item) => item.key === channel)
      .map((item) => ({ ...item, percent: 100 }))
  }, [channel])

  const actionHost = typeof document === 'undefined'
    ? null
    : document.querySelector<HTMLElement>('[data-template-action-host="data-detail"]')

  return (
    <>
      {actionHost && createPortal(
        <div className="sb-data-detail-page__breadcrumb-actions">
          <DetailActions onRefresh={refreshData} />
        </div>,
        actionHost,
      )}

      <div className="sb-data-detail-page sb-template-page-surface">
        <DetailPageLayout>

          <div className="sb-data-detail-page__body">
          <Card className="sb-data-detail-page__context" title="对象上下文">
            <div className="sb-data-detail-page__object">
              <div>
                <span className="sb-data-detail-page__eyebrow">当前分析对象</span>
                <div className="sb-data-detail-page__object-title">全场满50减6元券 <Tag color="green">已上线</Tag></div>
              </div>
              <span className="sb-data-detail-page__object-caption">电子券 · GAODE_MOP</span>
            </div>
            <DetailDescriptions data={dataDetailContext} column={3} />
          </Card>

          <Card className="sb-data-detail-page__filters" title="分析筛选">
            <div className="sb-data-detail-page__filter-row">
              <label>时间范围<Select value={timeRange} onChange={(value) => setTimeRange(value as TimeRange)}>
                <Select.Option value="12">近 12 周</Select.Option>
                <Select.Option value="4">近 4 周</Select.Option>
              </Select></label>
              <label>核销渠道<Select value={channel} onChange={(value) => setChannel(value as DataDetailChannel)}>
                {Object.entries(dataDetailChannelLabels).map(([value, label]) => <Select.Option key={value} value={value}>{label}</Select.Option>)}
              </Select></label>
              <label>数据状态<Select value={dataState} onChange={(value) => setDataState(value as DataDetailState)}>
                <Select.Option value="normal">正常数据</Select.Option>
                <Select.Option value="empty">空数据</Select.Option>
              </Select></label>
              <Button onClick={resetFilters}>重置</Button>
              <Button type="primary" onClick={refreshData}>查询</Button>
            </div>
          </Card>

          <Spin loading={isLoading} block>
            <div className="sb-data-detail-page__dashboard" aria-busy={isLoading}>
              <div className="sb-data-detail-page__metrics" aria-label="核心指标">
                <Card><Statistic title="发券数量" value={isEmpty ? '—' : metrics.issued} groupSeparator suffix="张" /></Card>
                <Card><Statistic title="领券人数" value={isEmpty ? '—' : metrics.claimed} groupSeparator suffix="人" /></Card>
                <Card><Statistic title="使用数量" value={isEmpty ? '—' : metrics.used} groupSeparator suffix="张" /></Card>
                <Card><Statistic title="核销率" value={isEmpty ? '—' : metrics.rate} precision={1} suffix="%" /></Card>
              </div>

              <Card className="sb-data-detail-page__trend" title={timeRange === '12' ? '近 12 周发券与核销趋势' : '近 4 周发券与核销趋势'}>
                <TrendChart data={trendData} empty={isEmpty} />
              </Card>

              <div className="sb-data-detail-page__distributions">
                <Card title="核销渠道分布">
                  <DistributionList items={visibleChannels} empty={isEmpty} label="核销渠道分布" />
                </Card>
                <Card title="城市分布">
                  <DistributionList items={dataDetailCityDistribution} empty={isEmpty} label="城市分布" />
                </Card>
              </div>

              <Card className="sb-data-detail-page__table-card" title="核销明细">
                {isEmpty ? <Empty description="暂无核销明细" /> : <div className="sb-data-detail-page__table"><Table rowKey="id" columns={redemptionColumns} data={visibleRows} pagination={false} border={{ headerCell: true, cell: true }} scroll={{ x: 830 }} /></div>}
              </Card>
            </div>
          </Spin>
          </div>
        </DetailPageLayout>
      </div>
    </>
  )
}
