<template>
  <Teleport to="[data-template-action-host='secondary-detail']">
    <div class="sb-secondary-detail-page__breadcrumb-actions">
      <Dropdown @select="handleMore">
        <Button>更多</Button>
        <template #content>
          <Doption value="copy">复制 QID</Doption>
          <Doption value="parent">查看父级卡券</Doption>
        </template>
      </Dropdown>
      <Button type="primary" @click="handleExport">导出{{ activeTabLabel }}</Button>
    </div>
  </Teleport>

  <div class="sb-secondary-detail-page sb-template-page-surface">
    <DetailPageLayout>
      <Card class="sb-secondary-detail-page__content">
        <div class="sb-secondary-detail-page__parent-summary">
          <DetailDescriptions :data="secondaryParentSummary" :column="3" empty-value="—" />
        </div>
        <Tabs v-model:active-key="activeTab">
          <template #extra>
            <Button size="small" @click="handleRefresh">刷新当前内容</Button>
          </template>
          <TabPane key="redemptions" title="核销记录">
            <div v-if="activeTab === 'redemptions'" class="sb-secondary-detail-page__table">
              <Table
                row-key="id"
                :columns="redemptionColumns"
                :data="secondaryRedemptionRows"
                :pagination="false"
                :border="{ headerCell: true, cell: true }"
                :scroll="{ x: 940 }"
              />
            </div>
          </TabPane>
          <TabPane key="stores" title="适用门店">
            <div v-if="activeTab === 'stores'" class="sb-secondary-detail-page__table">
              <Table
                row-key="id"
                :columns="storeColumns"
                :data="secondaryStoreRows"
                :pagination="false"
                :border="{ headerCell: true, cell: true }"
                :scroll="{ x: 610 }"
              />
            </div>
          </TabPane>
          <TabPane key="batches" title="发行批次">
            <div v-if="activeTab === 'batches'" class="sb-secondary-detail-page__table">
              <Table
                row-key="id"
                :columns="batchColumns"
                :data="secondaryBatchRows"
                :pagination="false"
                :border="{ headerCell: true, cell: true }"
                :scroll="{ x: 700 }"
              />
            </div>
          </TabPane>
          <TabPane key="activity" title="操作日志">
            <Timeline v-if="activeTab === 'activity'">
              <TimelineItem
                v-for="item in secondaryActivityTimeline"
                :key="item.label"
                :label="item.label"
              >
                {{ item.content }}
              </TimelineItem>
            </Timeline>
          </TabPane>
        </Tabs>
      </Card>
    </DetailPageLayout>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message } from '@sbux/starbucks-design-vue'
import {
  DetailDescriptions,
  DetailPageLayout,
} from '@sbux/starbucks-design-vue/pro'
import {
  secondaryActivityTimeline,
  secondaryBatchRows,
  secondaryParentSummary,
  secondaryRedemptionRows,
  secondaryStoreRows,
  secondaryTabLabels,
  type SecondaryTabKey,
} from './secondary-detail.shared'

const activeTab = ref<SecondaryTabKey>('redemptions')
const activeTabLabel = computed(() => secondaryTabLabels[activeTab.value])

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

const handleExport = () => Message.success(`已导出${activeTabLabel.value}`)
const handleRefresh = () => Message.info(`刷新${activeTabLabel.value}`)
const handleMore = (key: string) => Message.info(key === 'copy' ? '已复制 QID' : '返回父级卡券')
</script>
