<template>
  <Space>
    <Select
      :default-value="'Beijing'"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      allow-search
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
      <template #footer>
        <div style="padding: 6px 0; text-align: center;">
          <Button>Click Me</Button>
        </div>
      </template>
    </Select>
    <Select
      :default-value="'Beijing'"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      allow-search
      show-footer-on-empty
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
      <template #footer>
        <div style="padding: 6px 0; text-align: center;">
          <Button>Click Me</Button>
        </div>
      </template>
    </Select>
  </Space>
</template>
