<template>
  <Timeline>
    <TimelineItem>
      焦糖玛奇朵活动发布
      <template #label>
        <Tag>
          <template #icon>
            <icon-check-circle-fill />
          </template>
          已上线
        </Tag>
      </template>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { IconCheckCircleFill } from '@sbux/starbucks-design-vue/icon';
</script>
