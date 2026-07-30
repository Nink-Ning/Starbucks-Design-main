<template>
  <Timeline>
    <TimelineItem label="2026-03-10" dotColor="var(--color-success)">
      春季拿铁配方确认
    </TimelineItem>
    <TimelineItem label="2026-05-22">冷萃咖啡物料配送</TimelineItem>
    <TimelineItem label="2026-06-22" dotColor="var(--color-danger)">
      焦糖玛奇朵库存预警
      <IconExclamationCircleFill
        :style="{ color: 'var(--color-danger)', fontSize: '12px', marginLeft: '4px' }"
      />
    </TimelineItem>
    <TimelineItem label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
      秋季会员活动上线
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { IconExclamationCircleFill } from '@sbux/starbucks-design-vue/icon';
</script>
