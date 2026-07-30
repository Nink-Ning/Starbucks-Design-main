<template>
  <div :style="{ marginBottom: '40px' }">
    <TypographyText :style="{ verticalAlign: 'middle', marginRight: '8px' }">
      Reverse
    </TypographyText>
    <RadioGroup
      @change="handleChange"
      style="{ marginBottom: '30px' }"
      :modelValue="isReverse"
    >
      <Radio :value="false">No Reverse</Radio>
      <Radio :value="true">Reverse</Radio>
    </RadioGroup>
  </div>
  <Timeline :reverse="isReverse">
    <TimelineItem label="2026-03-10">春季拿铁配方确认</TimelineItem>
    <TimelineItem label="2026-05-12">门店冷萃物料到店</TimelineItem>
    <TimelineItem label="2026-09-30">秋季会员活动上线</TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isReverse = ref(false);

const handleChange = (bool) => {
  isReverse.value = bool;
};
</script>
