<template>
  <Space direction="vertical" size="large" fill>
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      :max-length="10"
      allow-clear
      show-word-limit
    />
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      :max-length="{ length: 10, errorOnly: true }"
      allow-clear
      show-word-limit
    />
  </Space>
</template>