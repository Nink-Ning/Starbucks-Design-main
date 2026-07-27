<template>
  <Space>
    <Tag color="gray">
      <template #icon>
        <icon-github />
      </template>
      Github
    </Tag>
    <Tag color="orangered">
      <template #icon>
        <icon-gitlab />
      </template>
      Gitlab
    </Tag>
    <Tag color="blue">
      <template #icon>
        <icon-twitter />
      </template>
      Twitter
    </Tag>
    <Tag color="arcoblue">
      <template #icon>
        <icon-facebook />
      </template>
      Facebook
    </Tag>
  </Space>
</template>

<script setup lang="ts">
import {
  IconGithub,
  IconGitlab,
  IconTwitter,
  IconFacebook,
} from '@sbux/starbucks-design-vue/icon';
</script>
