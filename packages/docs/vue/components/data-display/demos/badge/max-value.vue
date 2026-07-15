<template>
  <Space :size="40">
    <Badge :max-count="10" :count="0">
      <Avatar shape="square">
        <span>
          <IconUser />
        </span>
      </Avatar>
    </Badge>
    <Badge :max-count="10" :count="100">
      <Avatar shape="square">
        <span>
          <IconUser />
        </span>
      </Avatar>
    </Badge>
    <Badge :count="100">
      <Avatar shape="square">
        <span>
          <IconUser />
        </span>
      </Avatar>
    </Badge>
    <Badge :max-count="999" :count="1000">
      <Avatar shape="square">
        <span>
          <IconUser />
        </span>
      </Avatar>
    </Badge>
  </Space>
</template>

<script setup lang="ts">
import { IconUser } from '@arco-design/web-vue/es/icon';
</script>