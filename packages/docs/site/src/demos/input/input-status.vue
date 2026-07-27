<template>
  <Space direction="vertical" size="large">
    <Input
      :style="{ width: '320px' }"
      placeholder="Disabled status"
      disabled
    />
    <Input
      :style="{ width: '320px' }"
      default-value="Disabled"
      placeholder="Disabled status"
      disabled
    />
    <Input :style="{ width: '320px' }" placeholder="Error status" error />
  </Space>
</template>