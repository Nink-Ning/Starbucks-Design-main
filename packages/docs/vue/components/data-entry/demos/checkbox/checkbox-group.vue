<template>
  <Space direction="vertical" size="large">
    <CheckboxGroup :default-value="['1']">
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
    <CheckboxGroup direction="vertical">
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  </Space>
</template>