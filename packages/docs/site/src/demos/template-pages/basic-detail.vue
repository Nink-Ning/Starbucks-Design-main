<template>
  <div class="sb-basic-detail-page sb-template-page-surface">
    <Teleport v-if="pageHeaderInDocs" :to="pageHeaderTarget">
      <PageHeader
        title="卡券详情"
        help-text="查看卡券的只读信息"
        backable
        @back="handleBack"
      >
        <template #extra>
          <div class="sb-basic-detail-page__breadcrumb-actions">
            <Dropdown @select="handleMore">
              <Button type="outline">更多</Button>
              <template #content>
                <Doption value="copy">复制卡券</Doption>
                <Doption value="export">导出卡券</Doption>
              </template>
            </Dropdown>
            <Button type="primary" @click="handleEdit">编辑</Button>
          </div>
        </template>
      </PageHeader>
    </Teleport>
    <DetailPageLayout :max-width="1120">
      <PageHeader
        v-if="!pageHeaderInDocs"
        title="卡券详情"
        help-text="查看卡券的只读信息"
        backable
        @back="handleBack"
      >
        <template #extra>
          <div class="sb-basic-detail-page__breadcrumb-actions">
      <Dropdown @select="handleMore">
        <Button type="outline">更多</Button>
        <template #content>
          <Doption value="copy">复制卡券</Doption>
          <Doption value="export">导出卡券</Doption>
        </template>
      </Dropdown>
      <Button type="primary" @click="handleEdit">编辑</Button>
          </div>
        </template>
      </PageHeader>
      <div class="sb-basic-detail-page__content">
        <DetailSection>
          <div ref="labelProbeRef" class="sb-basic-detail-page__label-probe" aria-hidden="true">
            <span v-for="item in couponBasicInfo" :key="item.label" data-detail-label-probe>{{ item.label }}</span>
          </div>
          <div class="sb-basic-detail-page__wide-descriptions">
            <DetailDescriptions
              v-for="(column, index) in couponBasicInfoColumns"
              :key="index"
              :data="column"
              :column="1"
              table-layout="auto"
              :label-style="labelStyle"
              :empty-value="DETAIL_EMPTY_VALUE"
            />
          </div>
          <div class="sb-basic-detail-page__narrow-descriptions">
            <DetailDescriptions
              :data="couponBasicInfo"
              :column="1"
              table-layout="auto"
              :label-style="labelStyle"
              :empty-value="DETAIL_EMPTY_VALUE"
            />
          </div>
        </DetailSection>
      </div>
    </DetailPageLayout>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Message } from '@sbux/starbucks-design-vue'
import {
  DetailDescriptions,
  DetailPageLayout,
  DetailSection,
  PageHeader,
} from '@sbux/starbucks-design-vue/pro'
import {
  couponBasicInfo,
  couponBasicInfoColumns,
  DETAIL_LABEL_VALUE_GAP,
  DETAIL_EMPTY_VALUE,
} from './detail.shared'

const labelProbeRef = ref<HTMLElement>()
const labelWidth = ref<number>()
const labelStyle = computed(() => labelWidth.value === undefined
  ? undefined
  : {
      boxSizing: 'content-box',
      width: `${labelWidth.value}px`,
      paddingRight: `${DETAIL_LABEL_VALUE_GAP}px`,
    })

onMounted(async () => {
  await nextTick()
  const labels = labelProbeRef.value?.querySelectorAll<HTMLElement>('[data-detail-label-probe]')
  if (!labels?.length) return
  labelWidth.value = Math.max(...Array.from(labels, label => label.getBoundingClientRect().width))
})

const handleEdit = () => Message.success('进入卡券编辑')
const handleMore = (key: string) => Message.info(key === 'copy' ? '已复制卡券' : '已导出卡券')
const handleBack = () => Message.info('返回卡券列表')
const pageHeaderTarget = '[data-template-page-header-host="basic-detail"]'
const pageHeaderInDocs = typeof document !== 'undefined' && Boolean(document.querySelector(pageHeaderTarget))
</script>
