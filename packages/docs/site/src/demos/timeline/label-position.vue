<template>
  <div>
    <Row align="center">
      <TypographyText>labelPosition: &nbsp; &nbsp;</TypographyText>
      <RadioGroup @change="handleLabelPositionChange" :modelValue="pos">
        <Radio value="same">same</Radio>
        <Radio value="relative">relative</Radio>
      </RadioGroup>
    </Row>
    <Row align="center" :style="{ margin: '20px 0px 24px' }">
      <TypographyText>mode: &nbsp; &nbsp;</TypographyText>
      <RadioGroup @change="handleModeChange" :modelValue="mode">
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
        <Radio value="alternate">alternate</Radio>
      </RadioGroup>
    </Row>
    <Timeline :mode="mode" :labelPosition="pos">
      <TimelineItem label="2026-03-10" dotColor="var(--color-success)">
        春季拿铁配方确认
      </TimelineItem>
      <TimelineItem
        label="2026-05-12"
        dotColor="var(--color-danger)"
        labelPosition="same"
      >
        冷萃物料配送延迟
      </TimelineItem>
      <TimelineItem label="2026-09-30" position="bottom">
        秋季会员活动上线
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mode = ref('left');
const pos = ref('same');

const handleLabelPositionChange = (_pos) => {
  pos.value = _pos;
};

const handleModeChange = (_mode) => {
  mode.value = _mode;
};
</script>
