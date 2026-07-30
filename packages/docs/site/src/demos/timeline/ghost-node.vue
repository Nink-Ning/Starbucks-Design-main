<template>
  <Row align="center" :style="{ marginBottom: '24px' }">
    <Checkbox
      :checked="!!pendingProps.direction"
      @change="(v) => onChange({ direction: v ? 'horizontal' : '' })"
    >
      horizontal &nbsp; &nbsp;
    </Checkbox>
    <Checkbox
      :checked="!!pendingProps.reverse"
      @change="(v) => onChange({ reverse: v })"
    >
      reverse &nbsp; &nbsp;
    </Checkbox>
    <Checkbox
      :checked="!!pendingProps.pending"
      @change="
        (v) => onChange({ pending: v ? '等待门店反馈' : false })
      "
    >
      pending &nbsp; &nbsp;
    </Checkbox>

    <Checkbox
      :checked="!!pendingProps.hasPendingDot"
      @change="(v) => onChange({ hasPendingDot: v })"
    >
      custom pendingDot
    </Checkbox>
  </Row>
  <Timeline v-bind="pendingProps">
    <template v-if="pendingProps.hasPendingDot" #dot>
      <IconFire :style="{ color: 'var(--color-danger)' }" />
    </template>
    <TimelineItem label="2026-03-10" dotColor="var(--color-success)">
      浓缩咖啡豆完成烘焙
    </TimelineItem>
    <TimelineItem label="2026-05-12" dotColor="var(--color-danger)">
      冷萃桶配送延迟
    </TimelineItem>
    <TimelineItem label="2026-09-30">门店活动复盘完成</TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconFire } from '@sbux/starbucks-design-vue/icon';

const pendingProps = ref({});

const onChange = (newProps) => {
  pendingProps.value = {
    ...pendingProps.value,
    ...newProps,
  };
};
</script>
