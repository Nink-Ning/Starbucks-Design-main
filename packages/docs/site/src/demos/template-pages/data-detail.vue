<template>
  <Teleport to="[data-template-action-host='data-detail']">
    <div class="sb-data-detail-page__breadcrumb-actions">
      <Dropdown @select="handleMore">
        <Button type="outline">更多</Button>
        <template #content>
          <Doption value="export">导出数据</Doption>
          <Doption value="share">复制分析链接</Doption>
        </template>
      </Dropdown>
      <Button type="outline" @click="refreshData">刷新数据</Button>
      <Button type="primary" @click="handleExport">导出报表</Button>
    </div>
  </Teleport>

  <div class="sb-data-detail-page sb-template-page-surface">
    <DetailPageLayout>

      <div class="sb-data-detail-page__body">
        <Card class="sb-data-detail-page__context" title="对象上下文">
          <div class="sb-data-detail-page__object">
            <div>
              <span class="sb-data-detail-page__eyebrow">当前分析对象</span>
              <div class="sb-data-detail-page__object-title">全场满50减6元券 <Tag color="green">已上线</Tag></div>
            </div>
            <span class="sb-data-detail-page__object-caption">电子券 · GAODE_MOP</span>
          </div>
          <DetailDescriptions :data="dataDetailContext" :column="3" />
        </Card>

        <Card class="sb-data-detail-page__filters" title="分析筛选">
          <div class="sb-data-detail-page__filter-row">
            <label>时间范围<Select v-model="timeRange">
              <Option value="12">近 12 周</Option>
              <Option value="4">近 4 周</Option>
            </Select></label>
            <label>核销渠道<Select v-model="channel">
              <Option v-for="(label, value) in dataDetailChannelLabels" :key="value" :value="value">{{ label }}</Option>
            </Select></label>
            <label>数据状态<Select v-model="dataState">
              <Option value="normal">正常数据</Option>
              <Option value="empty">空数据</Option>
            </Select></label>
            <Button @click="resetFilters">重置</Button>
            <Button type="primary" @click="refreshData">查询</Button>
          </div>
        </Card>

        <Spin :loading="isLoading">
          <div class="sb-data-detail-page__dashboard" :aria-busy="isLoading">
            <div class="sb-data-detail-page__metrics" aria-label="核心指标">
              <Card>
                <Statistic v-if="!isEmpty" title="发券数量" :value="metrics.issued" show-group-separator suffix="张" />
                <div v-else class="sb-data-detail-page__metric-empty"><span>发券数量</span><strong>—</strong><em>张</em></div>
              </Card>
              <Card>
                <Statistic v-if="!isEmpty" title="领券人数" :value="metrics.claimed" show-group-separator suffix="人" />
                <div v-else class="sb-data-detail-page__metric-empty"><span>领券人数</span><strong>—</strong><em>人</em></div>
              </Card>
              <Card>
                <Statistic v-if="!isEmpty" title="使用数量" :value="metrics.used" show-group-separator suffix="张" />
                <div v-else class="sb-data-detail-page__metric-empty"><span>使用数量</span><strong>—</strong><em>张</em></div>
              </Card>
              <Card>
                <Statistic v-if="!isEmpty" title="核销率" :value="metrics.rate" :precision="1" suffix="%" />
                <div v-else class="sb-data-detail-page__metric-empty"><span>核销率</span><strong>—</strong><em>%</em></div>
              </Card>
            </div>

            <Card class="sb-data-detail-page__trend" :title="timeRange === '12' ? '近 12 周发券与核销趋势' : '近 4 周发券与核销趋势'">
              <Empty v-if="isEmpty" class="sb-data-detail-page__chart-empty" description="暂无趋势数据" />
              <div v-else class="sb-data-detail-chart">
                <svg
                  class="sb-data-detail-chart__svg"
                  :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
                  role="img"
                  aria-labelledby="data-detail-trend-title data-detail-trend-desc"
                >
                  <title id="data-detail-trend-title">近 12 周发券与核销趋势</title>
                  <desc id="data-detail-trend-desc">蓝线表示每周发券数量，绿色线表示每周核销数量。</desc>
                  <g class="sb-data-detail-chart__grid" aria-hidden="true">
                    <line v-for="ratio in [0, 0.5, 1]" :key="ratio" :x1="chartLeft" :x2="chartWidth - chartRight" :y1="chartTop + chartPlotHeight * ratio" :y2="chartTop + chartPlotHeight * ratio" />
                  </g>
                  <polyline class="sb-data-detail-chart__line sb-data-detail-chart__line--issued" :points="trendIssuedPoints" />
                  <polyline class="sb-data-detail-chart__line sb-data-detail-chart__line--used" :points="trendUsedPoints" />
                  <g class="sb-data-detail-chart__labels" aria-hidden="true">
                    <text v-for="(item, index) in trendData" :key="item.label" :x="chartX(index)" :y="chartHeight - 12" text-anchor="middle">{{ item.label }}</text>
                  </g>
                </svg>
                <div class="sb-data-detail-chart__legend" aria-hidden="true">
                  <span><i class="sb-data-detail-chart__legend-dot sb-data-detail-chart__legend-dot--issued" />发券数量</span>
                  <span><i class="sb-data-detail-chart__legend-dot sb-data-detail-chart__legend-dot--used" />使用数量</span>
                </div>
              </div>
            </Card>

            <div class="sb-data-detail-page__distributions">
              <Card title="核销渠道分布">
                <Empty v-if="isEmpty" class="sb-data-detail-page__distribution-empty" description="暂无核销渠道分布数据" />
                <ul v-else class="sb-data-detail-distribution" aria-label="核销渠道分布">
                  <li v-for="item in visibleChannels" :key="item.label" class="sb-data-detail-distribution__item">
                    <div class="sb-data-detail-distribution__header"><span>{{ item.label }}</span><span>{{ item.count.toLocaleString() }} 张 · {{ item.percent }}%</span></div>
                    <div class="sb-data-detail-distribution__track" role="progressbar" :aria-label="`${item.label}占比`" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="item.percent"><span :style="{ width: `${item.percent}%` }" /></div>
                  </li>
                </ul>
              </Card>
              <Card title="城市分布">
                <Empty v-if="isEmpty" class="sb-data-detail-page__distribution-empty" description="暂无城市分布数据" />
                <ul v-else class="sb-data-detail-distribution" aria-label="城市分布">
                  <li v-for="item in dataDetailCityDistribution" :key="item.label" class="sb-data-detail-distribution__item">
                    <div class="sb-data-detail-distribution__header"><span>{{ item.label }}</span><span>{{ item.count.toLocaleString() }} 张 · {{ item.percent }}%</span></div>
                    <div class="sb-data-detail-distribution__track" role="progressbar" :aria-label="`${item.label}占比`" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="item.percent"><span :style="{ width: `${item.percent}%` }" /></div>
                  </li>
                </ul>
              </Card>
            </div>

            <Card class="sb-data-detail-page__table-card" title="核销明细">
              <Empty v-if="isEmpty" description="暂无核销明细" />
              <div v-else class="sb-data-detail-page__table">
                <Table row-key="id" :columns="redemptionColumns" :data="visibleRows" :pagination="false" :border="{ headerCell: true, cell: true }" :scroll="{ x: 830 }" />
              </div>
            </Card>
          </div>
        </Spin>
      </div>
    </DetailPageLayout>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { Message } from '@sbux/starbucks-design-vue'
import {
  DetailDescriptions,
  DetailPageLayout,
} from '@sbux/starbucks-design-vue/pro'
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

const redemptionColumns = [
  { title: '核销时间', dataIndex: 'time', width: 180 },
  { title: '渠道', dataIndex: 'channel', width: 120 },
  { title: '城市', dataIndex: 'city', width: 90 },
  { title: '门店', dataIndex: 'store', width: 150 },
  { title: '会员', dataIndex: 'member', width: 110 },
  { title: '数量', dataIndex: 'quantity', width: 80 },
  { title: '状态', dataIndex: 'status', width: 100 },
]

const channel = ref<DataDetailChannel>('all')
const timeRange = ref<'12' | '4'>('12')
const dataState = ref<DataDetailState>('normal')
const isLoading = ref(false)
let loadingTimer: ReturnType<typeof setTimeout> | undefined

const metrics = computed(() => dataDetailMetrics[channel.value])
const isEmpty = computed(() => dataState.value === 'empty')
const trendData = computed(() => timeRange.value === '4' ? dataDetailWeeklyTrend.slice(-4) : dataDetailWeeklyTrend)
const visibleRows = computed(() => (channel.value === 'all' ? dataDetailRedemptionRows : dataDetailRedemptionRows.filter((row) => row.channel === channel.value)))
const visibleChannels = computed(() => channel.value === 'all'
  ? dataDetailChannelDistribution
  : dataDetailChannelDistribution.filter((item) => item.key === channel.value).map((item) => ({ ...item, percent: 100 })))

const chartWidth = 720
const chartHeight = 240
const chartLeft = 48
const chartRight = 16
const chartTop = 20
const chartBottom = 38
const chartPlotWidth = chartWidth - chartLeft - chartRight
const chartPlotHeight = chartHeight - chartTop - chartBottom
const trendMax = computed(() => Math.max(...trendData.value.flatMap((item) => [item.issued, item.used]), 1))
const chartX = (index: number) => chartLeft + (trendData.value.length === 1 ? chartPlotWidth / 2 : (chartPlotWidth * index) / (trendData.value.length - 1))
const chartY = (value: number) => chartTop + chartPlotHeight - (value / trendMax.value) * chartPlotHeight
const trendIssuedPoints = computed(() => trendData.value.map((item, index) => `${chartX(index)},${chartY(item.issued)}`).join(' '))
const trendUsedPoints = computed(() => trendData.value.map((item, index) => `${chartX(index)},${chartY(item.used)}`).join(' '))

const refreshData = () => {
  if (loadingTimer) clearTimeout(loadingTimer)
  isLoading.value = true
  loadingTimer = setTimeout(() => { isLoading.value = false }, 600)
}
const resetFilters = () => {
  channel.value = 'all'
  timeRange.value = '12'
  dataState.value = 'normal'
  isLoading.value = false
}
const handleExport = () => Message.info('报表导出仅为示例行为')
const handleMore = (key: string) => Message.info(key === 'export' ? '数据导出仅为示例行为' : '已复制分析链接')

onBeforeUnmount(() => {
  if (loadingTimer) clearTimeout(loadingTimer)
})
</script>
