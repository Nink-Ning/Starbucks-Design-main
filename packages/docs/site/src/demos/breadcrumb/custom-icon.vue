<template>
  <Space direction="vertical">
    <Breadcrumb>
      <BreadcrumbItem>
        <icon-home />
      </BreadcrumbItem>
      <BreadcrumbItem>Channel</BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem>
        <icon-home />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <icon-at />
        Channel
      </BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
  </Space>
</template>

<script setup lang="ts">
import { IconHome, IconAt } from '@sbux/starbucks-design-vue/icon';
</script>
