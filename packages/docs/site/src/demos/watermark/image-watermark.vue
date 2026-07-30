<template>
  <Watermark
    style="display: block; width: 100%; min-width: 100%; flex: 1 1 100%; align-self: stretch;"
    :width="148"
    :height="24"
    :image="markImage"
    :gap="[92, 64]"
    :offset="[18, 16]"
  >
    <div style="width: 100%; min-height: 300px; box-sizing: border-box; background: rgba(0, 120, 84, 0.03);" />
  </Watermark>
</template>

<script setup lang="ts">
const markImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="148" height="24" viewBox="0 0 148 24"><text x="0" y="18" fill="%23007854" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="2">STARBUCKS</text></svg>';
</script>
