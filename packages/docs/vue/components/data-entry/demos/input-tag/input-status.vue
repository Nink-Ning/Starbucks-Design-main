<template>
  <Space direction="vertical" size="large">
    <InputTag
      :default-value="['test']"
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      disabled
    />
    <InputTag
      :default-value="['test']"
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      readonly
    />
    <InputTag
      :default-value="['test']"
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      error
    />
  </Space>
</template>