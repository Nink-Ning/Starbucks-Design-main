<template>
  <Teleport to="[data-template-action-host='card-detail']">
    <div class="sb-card-detail-page__breadcrumb-actions">
      <Dropdown @select="handleMore">
        <Button>更多</Button>
        <template #content>
          <Doption value="copy">复制卡券</Doption>
          <Doption value="export">导出卡券</Doption>
        </template>
      </Dropdown>
      <Button type="primary" @click="handleEdit">编辑</Button>
    </div>
  </Teleport>

  <div class="sb-card-detail-page sb-template-page-surface">
    <DetailPageLayout>
      <div class="sb-card-detail-page__cards">
        <Card class="sb-card-detail-page__card sb-card-detail-page__card--wide" title="基本信息">
          <DetailDescriptions :data="couponBasicInfo" :column="2" :empty-value="DETAIL_EMPTY_VALUE" />
        </Card>

        <Card class="sb-card-detail-page__card sb-card-detail-page__card--wide" title="适用范围">
          <div class="sb-card-detail-page__table">
            <Table
              row-key="scope"
              :columns="scopeColumns"
              :data="couponStoreScope"
              :pagination="false"
              :border="{ headerCell: true, cell: true }"
              :scroll="{ x: 600 }"
            />
          </div>
        </Card>

        <Card class="sb-card-detail-page__card sb-card-detail-page__card--wide" title="操作记录">
          <Timeline>
            <TimelineItem
              v-for="item in couponActivityTimeline"
              :key="item.label"
              :label="item.label"
            >
              {{ item.content }}
            </TimelineItem>
          </Timeline>
        </Card>
      </div>
    </DetailPageLayout>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@sbux/starbucks-design-vue'
import {
  DetailDescriptions,
  DetailPageLayout,
} from '@sbux/starbucks-design-vue/pro'
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

const handleEdit = () => Message.success('进入卡券编辑')
const handleMore = (key: string) => Message.info(key === 'copy' ? '已复制卡券' : '已导出卡券')
</script>
