<template>
  <Space direction="vertical" size="large">
    <Select :style="{ width: '320px' }" placeholder="Please select ...">
      <Optgroup label="Group-1">
        <Option>Beijing</Option>
        <Option>Shanghai</Option>
      </Optgroup>
      <Optgroup label="Group-2">
        <Option>Guangzhou</Option>
        <Option disabled>Disabled</Option>
        <Option>Shenzhen</Option>
      </Optgroup>
      <Optgroup label="Group-3">
        <Option>Chengdu</Option>
        <Option>Wuhan</Option>
      </Optgroup>
    </Select>
    <Select
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      multiple
    >
      <Optgroup label="Group-1">
        <Option>Beijing</Option>
        <Option>Shanghai</Option>
      </Optgroup>
      <Optgroup label="Group-2">
        <Option>Guangzhou</Option>
        <Option disabled>Disabled</Option>
        <Option>Shenzhen</Option>
      </Optgroup>
      <Optgroup label="Group-3">
        <Option>Chengdu</Option>
        <Option>Wuhan</Option>
      </Optgroup>
    </Select>
  </Space>
</template>
