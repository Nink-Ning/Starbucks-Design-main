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
      <TimelineItem label="2017-03-10" dotColor="#52C419">
        The first milestone
      </TimelineItem>
      <TimelineItem
        label="2018-05-12"
        dotColor="#F5222D"
        labelPosition="same"
      >
        The second milestone
      </TimelineItem>
      <TimelineItem label="2020-09-30" position="bottom">
        The third milestone
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