<template>
  <Button
    type="primary"
    :style="{ marginBottom: '20px' }"
    @click="handleScrollIntoView"
  >
    Scroll to 0-0-2-2, i.e. the 26th.
  </Button>
  <Tree
    ref="treeRef"
    blockNode
    checkable
    :data="treeData"
    :virtualListProps="{
      height: 200,
    }"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';

function loop(path = '0', level = 2) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = loop(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}

const treeRef = ref();
const treeData = loop();

const handleScrollIntoView = () => {
  treeRef.value && treeRef.value.scrollIntoView({ key: '0-0-2-2' });
};
</script>