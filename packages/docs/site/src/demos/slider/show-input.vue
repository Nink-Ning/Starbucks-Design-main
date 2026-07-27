<template>
  <Space direction="vertical" size="large">
    <Slider :default-value="10" :style="{ width: '300px' }" show-input />
    <Slider
      :default-value="[10, 20]"
      :style="{ width: '380px' }"
      range
      show-input
    />
  </Space>
</template>