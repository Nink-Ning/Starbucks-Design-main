<template>
  <div class="divider-demo">
    <p>运营数据按业务主题拆分，便于快速定位信息。</p>
    <Divider orientation="left">设计规范</Divider>
    <p>中间标题适合用于页面主内容的章节切换。</p>
    <Divider orientation="center">组件资产</Divider>
    <p>右侧标题可用于补充说明或收尾信息。</p>
    <Divider orientation="right">交付记录</Divider>
    <Divider :margin="10"><icon-star /></Divider>
  </div>
</template>

<script setup lang="ts">
import { IconStar } from '@sbux/starbucks-design-vue/icon';
</script>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  color: var(--color-text-primary);
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-2);
  border-radius: 8px;
}
.divider-demo p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 22px;
}
</style>
