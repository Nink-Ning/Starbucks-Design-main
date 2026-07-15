<template>
  <Space>
    <template #split>
      <Divider direction="vertical" :margin="0" />
    </template>
    <Button type="primary">Item1</Button>
    <Tag v-if="show" color="arcoblue">Tag</Tag>
    <Button type="primary">Item2</Button>
    <Button type="primary">Item3</Button>
    <Switch v-model="show" />
  </Space>
  <Divider />
  <Space>
    <template #split>
      <Divider direction="vertical" :margin="0" />
    </template>
    <Link type="primary">Link1</Link>
    <Link type="primary">Link2</Link>
    <Link type="primary">Link3</Link>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
</script>