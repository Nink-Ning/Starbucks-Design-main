<template>
  <Space align="start">
    <Slider :default-value="50" direction="vertical" />

    <Slider
      direction="vertical"
      :default-value="5"
      :style="{ width: '300px' }"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }"
    />
  </Space>
</template>