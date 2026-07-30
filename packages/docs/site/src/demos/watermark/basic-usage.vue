<template>
  <Watermark
    content="Starbucks DesignKit"
    style="display: block; width: 100%; min-width: 100%; flex: 1 1 100%; align-self: stretch;"
    :gap="[72, 56]"
    :offset="[16, 12]"
    :font-style="{
      color: 'rgba(0, 120, 84, 0.28)',
      fontSize: 16,
      fontWeight: 700
    }"
  >
    <div
      style="width: 100%; min-height: 300px; box-sizing: border-box; position: relative; background: rgba(0, 120, 84, 0.03);"
    >
      <span style="position: absolute; opacity: 0; pointer-events: none;">Starbucks DesignKit</span>
    </div>
  </Watermark>
</template>
