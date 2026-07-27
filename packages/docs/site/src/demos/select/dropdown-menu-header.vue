<template>
  <Space>
    <Select
      :default-value="'Beijing'"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
      <template #header>
        <div style="padding: 6px 12px;">
          <Checkbox value="1">全选</Checkbox>
        </div>
      </template>
    </Select>

    <Select
      :default-value="'Beijing'"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      show-header-on-empty
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
      <template #header>
        <div style="padding: 6px 12px;">
          <Checkbox value="1">全选</Checkbox>
        </div>
      </template>
    </Select>
  </Space>
</template>
