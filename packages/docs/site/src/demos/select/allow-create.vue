<template>
  <Space direction="vertical" size="large">
    <Select
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      allow-create
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Chengdu</Option>
      <Option>Wuhan</Option>
    </Select>
    <Select
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      multiple
      allow-create
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Chengdu</Option>
      <Option>Wuhan</Option>
    </Select>
  </Space>
</template>
