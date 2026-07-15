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
    <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
    <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
    <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
  </Timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isReverse = ref(false);

const handleChange = (bool) => {
  isReverse.value = bool;
};
</script>