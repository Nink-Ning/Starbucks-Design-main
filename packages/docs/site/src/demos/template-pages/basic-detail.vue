<template>
  <Teleport to="[data-template-action-host='basic-detail']">
    <div class="sb-basic-detail-page__breadcrumb-actions">
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

  <div class="sb-basic-detail-page sb-template-page-surface">
    <DetailPageLayout :max-width="1120">
      <div class="sb-basic-detail-page__content">
        <DetailSection>
          <DetailDescriptions :data="couponBasicInfo" :empty-value="DETAIL_EMPTY_VALUE" />
        </DetailSection>
      </div>
    </DetailPageLayout>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@sbux/starbucks-design-vue'
import {
  DetailDescriptions,
  DetailPageLayout,
  DetailSection,
} from '@sbux/starbucks-design-vue/pro'
import {
  couponBasicInfo,
  DETAIL_EMPTY_VALUE,
} from './detail.shared'

const handleEdit = () => Message.success('进入卡券编辑')
const handleMore = (key: string) => Message.info(key === 'copy' ? '已复制卡券' : '已导出卡券')
</script>
