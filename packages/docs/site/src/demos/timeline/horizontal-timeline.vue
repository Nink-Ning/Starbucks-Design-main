<template>
  <div>
    <Row align="center" :style="{ marginBottom: '24px' }">
      <TypographyText>mode: &nbsp; &nbsp;</TypographyText>
      <RadioGroup @change="handleChange" :modelValue="mode">
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="alternate">alternate</Radio>
      </RadioGroup>
    </Row>
    <Timeline direction="horizontal" pending :mode="mode">
      <TimelineItem label="2012-08">
        <Row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Toutiao
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2012
            </div>
          </div>
        </Row>
      </TimelineItem>
      <TimelineItem label="2017-05">
        <Row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Xigua Video
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2017
            </div>
          </div>
        </Row>
      </TimelineItem>
      <TimelineItem label="2018-07">
        <Row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Pipidance
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2018
            </div>
          </div>
        </Row>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mode = ref('top');

const handleChange = (_mode) => {
  mode.value = _mode;
};
</script>
