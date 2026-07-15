<template>
  <div :style="{ display: 'flex' }">
    <Timeline :style="{ marginRight: '40px' }">
      <TimelineItem label="2020-04-12" dotColor="#00B42A">
        The first milestone
      </TimelineItem>
      <TimelineItem label="2020-05-17">
        The second milestone
      </TimelineItem>
      <TimelineItem label="2020-06-22">
        <template #dot>
          <IconClockCircle :style="{ fontSize: '12px', color: '#F53F3F' }" />
        </template>
        The third milestone
      </TimelineItem>
      <TimelineItem label="2020-06-22" dotColor="var(--color-fill-4)">
        The third milestone
      </TimelineItem>
    </Timeline>

    <Timeline :style="{ marginRight: '40px' }">
      <TimelineItem label="2020-04-12">
        <template #dot>
          <IconCheck
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
          />
        </template>
        The first milestone
      </TimelineItem>
      <TimelineItem label="2020-05-17">
        <template #dot>
          <IconCheck
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
          />
        </template>
      </TimelineItem>
      <TimelineItem label="2020-06-22">The third milestone</TimelineItem>
      <TimelineItem label="2020-06-22" dotColor="var(--color-fill-4)">
        The third milestone
      </TimelineItem>
    </Timeline>

    <Timeline>
      <TimelineItem label="2020-04-12">The first milestone</TimelineItem>
      <TimelineItem label="2020-05-17" dotColor="var(--color-fill-4)">
        The second milestone
      </TimelineItem>
      <TimelineItem label="2020-06-22" dotColor="var(--color-fill-4)">
        The third milestone
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { IconCheck } from '@arco-design/web-vue/es/icon';
</script>