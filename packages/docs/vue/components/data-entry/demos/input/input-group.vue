<template>
  <Space direction="vertical" size="large">
    <InputGroup>
      <Input :style="{ width: '160px' }" placeholder="first" />
      <Input :style="{ width: '160px' }" placeholder="second" />
    </InputGroup>
    <InputGroup>
      <Select
        :options="['Option1', 'Option2', 'Option3']"
        :style="{ width: '160px' }"
        placeholder="first"
      />
      <Input :style="{ width: '160px' }" placeholder="second" />
    </InputGroup>
  </Space>
</template>