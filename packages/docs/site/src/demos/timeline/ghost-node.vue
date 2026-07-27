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
        (v) => onChange({ pending: v ? 'This is a pending dot' : false })
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
      <IconFire :style="{ color: '#e70a0a' }" />
    </template>
    <TimelineItem label="2017-03-10" dotColor="#52C419">
      The first milestone
    </TimelineItem>
    <TimelineItem label="2018-05-12" dotColor="#F5222D">
      The second milestone
    </TimelineItem>
    <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
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
