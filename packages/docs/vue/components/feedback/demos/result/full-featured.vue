<template>
  <Result status="error" title="No internet ">
    <template #icon>
      <IconFaceFrownFill />
    </template>
    <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

    <template #extra>
      <Button type="primary">Refresh</Button>
    </template>
    <Typography style="background: var(--color-fill-2); padding: 24px;">
      <TypographyParagraph>Try:</TypographyParagraph>
      <ul>
        <li> Checking the network cables, modem, and router </li>
        <li> Reconnecting to Wi-Fi </li>
      </ul>
    </Typography>
  </Result>
</template>

<script setup lang="ts">
import { IconFaceFrownFill } from '@arco-design/web-vue/es/icon';
</script>