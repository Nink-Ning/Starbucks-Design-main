<template>
  <Space direction="vertical" size="large">
    <Select
      :style="{ width: '100%' }"
      placeholder="Please select ..."
      :bordered="false"
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
    <Select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :bordered="false"
    >
      <Option>Beijing</Option>
      <Option :tag-props="{ color: 'red' }">Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
    </Select>
  </Space>
</template>
