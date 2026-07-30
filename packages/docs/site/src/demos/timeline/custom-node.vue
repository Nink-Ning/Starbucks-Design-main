<template>
  <div :style="{ display: 'flex' }">
    <Timeline :style="{ marginRight: '40px' }">
      <TimelineItem label="2026-03-10" dotColor="var(--color-success)">
        拿铁配方确认
      </TimelineItem>
      <TimelineItem label="2026-05-17">
        冷萃物料到店
      </TimelineItem>
      <TimelineItem label="2026-06-22">
        <template #dot>
          <IconClockCircle :style="{ fontSize: '12px', color: 'var(--color-danger)' }" />
        </template>
        焦糖玛奇朵库存预警
      </TimelineItem>
      <TimelineItem label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
        秋季会员活动准备
      </TimelineItem>
    </Timeline>

    <Timeline :style="{ marginRight: '40px' }">
      <TimelineItem label="2026-03-10">
        <template #dot>
          <IconCheck
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
            }"
          />
        </template>
        拿铁配方确认
      </TimelineItem>
      <TimelineItem label="2026-05-17">
        <template #dot>
          <IconCheck
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
            }"
          />
        </template>
        冷萃物料到店
      </TimelineItem>
      <TimelineItem label="2026-06-22">焦糖玛奇朵库存预警</TimelineItem>
      <TimelineItem label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
        秋季会员活动准备
      </TimelineItem>
    </Timeline>

    <Timeline>
      <TimelineItem label="2026-03-10">拿铁配方确认</TimelineItem>
      <TimelineItem label="2026-05-17" dotColor="var(--bg-color-secondarycomponent-active)">
        冷萃物料到店
      </TimelineItem>
      <TimelineItem label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
        秋季会员活动准备
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { IconCheck, IconClockCircle } from '@sbux/starbucks-design-vue/icon';
</script>
