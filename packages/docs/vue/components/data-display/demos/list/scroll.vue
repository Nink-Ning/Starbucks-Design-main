<template>
  <div style="margin-bottom: 10px">
    <Switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <List
    :max-height="240"
    @reach-bottom="handleReachBottom"
    :scrollbar="scrollbar"
  >
    <template #header> List title </template>
    <template #scroll-loading>
      <div v-if="bottom">No more data</div>
      <Spin v-else />
    </template>
    <ListItem v-for="item of data">{{ item }}</ListItem>
  </List>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const current = ref(1);
const bottom = ref(false);
const data = reactive([]);
const scrollbar = ref(true);

const handleReachBottom = () => {
  if (current.value <= 5) {
    window.setTimeout(() => {
      const index = data.length;
      data.push(
        `Beijing Bytedance Technology Co., Ltd. ${index + 1}`,
        `Bytedance Technology Co., Ltd. ${index + 2}`,
        `Beijing Toutiao Technology Co., Ltd. ${index + 3}`,
        `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
        `China Beijing Bytedance Technology Co., Ltd. ${index + 5}`
      );
      current.value += 1;
    }, 2000);
  } else {
    bottom.value = true;
  }
};
</script>