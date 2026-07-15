<template>
  <div>
    <Steps changeable :current="current" @change="handleSetCurrent">
      <Step description="This is a description">Succeeded</Step>
      <Step description="This is a description">Processing</Step>
      <Step description="This is a description">Pending</Step>
    </Steps>
    <div
      :style="{
        width: '100%',
        height: '200px',
        textAlign: 'center',
        background: 'var(--color-bg-2)',
        color: '#C2C7CC',
      }"
    >
      <div style="line-height: 160px;">Step{{ current }} Content</div>
      <Space size="large">
        <Button type="secondary" :disabled="current <= 1" @click="handlePrev">
          <IconLeft /> Back
        </Button>
        <Button type="primary" :disabled="current >= 3" @click="handleNext">
          Next <IconRight />
        </Button>
      </Space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  current: 1,
});

const { current } = toRefs(state);

const handlePrev = () => {
  current.value = Math.max(1, current.value - 1);
};

const handleNext = () => {
  current.value = Math.min(3, current.value + 1);
};

const handleSetCurrent = (current) => {
  current.value = current;
};
</script>