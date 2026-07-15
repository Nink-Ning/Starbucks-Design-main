<template>
  <Space :size="40">
    <Badge text="NEW">
      <Avatar shape="square">
        <span>
          <IconUser />
        </span>
      </Avatar>
    </Badge>
    <Badge text="HOT">
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