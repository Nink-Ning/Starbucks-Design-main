<template>
  <Space size="large">
    <Statistic title="New Users" :value="125670" show-group-separator>
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </Statistic>
    <Statistic
      title="User Growth Rate"
      :value="50.52"
      :precision="2"
      :value-style="{ color: 'var(--color-success)' }"
    >
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </Statistic>
  </Space>
</template>

<script setup lang="ts">
import { IconArrowRise } from '@sbux/starbucks-design-vue/icon';
</script>
