<template>
  <div>
    <Steps
      changeable
      label-placement="vertical"
      :current="current"
      @change="handleSetCurrent"
    >
      <Step description="This is a description">
        Succeeded
        <template v-slot:node="slotProps">
          <Popover content="step tip" :popup-visible="current === 1">
            <span>{{ slotProps.step }}</span>
          </Popover>
        </template>
      </Step>
      <Step description="This is a description">
        Processing Succeeded
        <template v-slot:node="slotProps">
          <Popover content="step tip" :popup-visible="current === 2">
            <span>{{ slotProps.step }}</span>
          </Popover>
        </template>
      </Step>
      <Step description="This is a description"
        >Pending
        <template v-slot:node="slotProps">
          <Popover content="step tip" :popup-visible="current === 3">
            <span>{{ slotProps.step }}</span>
          </Popover>
        </template>
      </Step>
    </Steps>
    <div style="margin-top: 20px; text-align: center;">
      <Space size="large">
        <Button type="secondary" :disabled="current <= 1" @click="handlePrev">
          <IconLeft />
          Back
        </Button>
        <Button type="primary" :disabled="current >= 3" @click="handleNext">
          Next
          <IconRight />
        </Button>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconLeft, IconRight } from '@sbux/starbucks-design-vue/icon';

const current = ref(1);

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
