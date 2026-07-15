<template>
  <div>
    <div :style="gridStyle">
      <Button type="primary" loading>Loading</Button>
      <Button loading>Loading</Button>
      <Button type="dashed" loading>Loading</Button>
      <Button type="primary" shape="circle" loading />
      <Button shape="circle" loading />
      <Button type="dashed" shape="circle" loading />
    </div>
    <Button
      type="primary"
      :loading="loading1"
      style="margin: 24px"
      @click="handleClick1"
    >
      Click Me
    </Button>
    <Button
      type="primary"
      :loading="loading2"
      style="margin: 24px"
      @click="handleClick2"
    >
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </Button>
    <Divider style="width: 440px; min-width: 440px">
      loading fixed width
    </Divider>
    <Button
      type="primary"
      loading-fixed-width
      :loading="loading3"
      style="margin: 24px"
      @click="handleClick3"
    >
      Search
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const triggerLoading = (stateRef) => {
  if (stateRef.value) {
    return;
  }
  stateRef.value = true;
  setTimeout(() => {
    stateRef.value = false;
  }, 4000);
};

const loading1 = ref(false);
const loading2 = ref(false);
const loading3 = ref(false);

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 100px)',
  rowGap: '24px',
  columnGap: '24px',
  marginLeft: '24px',
};

const handleClick1 = () => {
  triggerLoading(loading1);
};
const handleClick2 = () => {
  triggerLoading(loading2);
};
const handleClick3 = () => {
  triggerLoading(loading3);
};
</script>