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
      <TimelineItem label="2026-03">
        <Row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <div :style="coffeeIconStyle">☕</div>
          <div :style="{ marginBottom: '12px' }">
            经典拿铁
            <div :style="descStyle">春季主推饮品上新</div>
          </div>
        </Row>
      </TimelineItem>
      <TimelineItem label="2026-05">
        <Row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <div :style="{ ...coffeeIconStyle, background: 'var(--bg-color-component)' }">🧊</div>
          <div :style="{ marginBottom: '12px' }">
            冷萃咖啡
            <div :style="descStyle">夏季冰饮物料到店</div>
          </div>
        </Row>
      </TimelineItem>
      <TimelineItem label="2026-09">
        <Row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <div :style="{ ...coffeeIconStyle, background: 'var(--bg-color-secondarycomponent-active)' }">🍵</div>
          <div :style="{ marginBottom: '12px' }">
            抹茶星冰乐
            <div :style="descStyle">会员日限定活动开启</div>
          </div>
        </Row>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mode = ref('top');

const coffeeIconStyle = {
  width: '40px',
  height: '40px',
  margin: '0 12px 12px 12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  boxSizing: 'border-box',
  background: 'var(--color-primary-light)',
  color: 'var(--color-primary)',
  fontSize: '20px',
  lineHeight: '40px',
};

const descStyle = {
  fontSize: '12px',
  color: 'var(--color-text-secondary)',
};

const handleChange = (_mode) => {
  mode.value = _mode;
};
</script>
