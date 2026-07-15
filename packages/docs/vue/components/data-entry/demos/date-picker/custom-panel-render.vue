<template>
  <Space direction="vertical">
    <DatePicker style="width: 280px" :panel-render="panelRender" />
    <RangePicker style="width: 360px" :panel-render="panelRender" />
  </Space>
</template>

<script setup lang="ts">
import { h } from 'vue';

const panelRender = (panelNode) =>
  h('div', { class: 'picker-panel-render-wrapper' }, [
    panelNode,
    h(
      'div',
      {
        style:
          'padding: 8px 12px; border-top: 1px solid var(--color-neutral-3); color: var(--color-text-2);',
      },
      'Custom panel footer'
    ),
  ]);
</script>