<template>
  <TreeSelect
    :data="treeData"
    :allow-search="{
      retainInputValue: true,
    }"
    multiple
    tree-checkable
    :scrollbar="false"
    tree-checked-strategy="parent"
    :treeProps="{
      virtualListProps: {
        height: 200,
      },
    }"
  />
</template>
<script setup lang="ts">
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

const treeData = loop();
</script>
