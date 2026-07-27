<template>
  <Timeline>
    <TimelineItem label="2017-03-10" dotColor="#00B42A">
      The first milestone
    </TimelineItem>
    <TimelineItem label="2018-05-22">The second milestone</TimelineItem>
    <TimelineItem label="2020-06-22" dotColor="#F53F3F">
      The third milestone
      <IconExclamationCircleFill
        :style="{ color: 'F53F3F', fontSize: '12px', marginLeft: '4px' }"
      />
    </TimelineItem>
    <TimelineItem label="2020-09-30" dotColor="#C9CDD4">
      The fourth milestone
    </TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { IconExclamationCircleFill } from '@sbux/starbucks-design-vue/icon';
</script>
