<template>
  <Space :size="40">
    <Badge :count="2" />
    <Badge
      :count="2"
      :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
    />
    <Badge :count="16" />
    <Badge :count="1000" :max-count="99" />
  </Space>
</template>