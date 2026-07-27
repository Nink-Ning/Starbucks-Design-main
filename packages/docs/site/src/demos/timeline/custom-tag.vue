<template>
  <Timeline>
    <TimelineItem>
      Code Review
      <template #label>
        <Tag>
          <template #icon>
            <icon-check-circle-fill />
          </template>
          Passed
        </Tag>
      </template>
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { IconCheckCircleFill } from '@sbux/starbucks-design-vue/icon';
</script>
