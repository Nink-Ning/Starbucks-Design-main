<template>
  <div class="divider-demo">
    <p>门店首页会按照运营目标组织信息层级，核心指标优先展示。</p>
    <Divider />
    <p>分割线用于拆分不同业务模块，让阅读节奏保持清晰。</p>
    <Divider dashed />
    <p>虚线样式适合表达弱分组关系，例如补充说明或临时提示。</p>
    <Divider :size="2" style="border-bottom-style: dotted" />
    <p>点状分割线可用于视觉权重更轻的内容间隔。</p>
  </div>
  <div class="divider-demo" style="margin-top: 24px">
    <div class="flex-box">
      <span class="avatar"><IconImage /></span>
      <div class="content">
        <TypographyTitle :heading="6">设计稿评审</TypographyTitle>
        2026-07-24 10:30
      </div>
    </div>
    <Divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconUser /></span>
      <div class="content">
        <TypographyTitle :heading="6">组件联调</TypographyTitle>
        2026-07-24 14:00
      </div>
    </div>
    <Divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconPen /></span>
      <div class="content">
        <TypographyTitle :heading="6">交付验收</TypographyTitle>
        2026-07-25 09:15
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconImage,
  IconUser,
  IconPen,
} from '@sbux/starbucks-design-vue/icon';
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
.half-divider {
  left: 56px;
  width: calc(100% - 56px);
  min-width: auto;
  margin: 16px 0;
}
.flex-box {
  display: flex;
  align-items: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: var(--color-primary);
  font-size: 16px;
  background: var(--color-fill-2);
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>
