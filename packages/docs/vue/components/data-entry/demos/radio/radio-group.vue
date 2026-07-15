<template>
  <Space direction="vertical" size="large">
    <RadioGroup>
      <Radio value="A">A</Radio>
      <Radio value="B">B</Radio>
      <Radio value="C">C</Radio>
      <Radio value="D">D</Radio>
    </RadioGroup>
    <RadioGroup>
      <Radio value="A">A</Radio>
      <Radio value="B">B</Radio>
      <Radio value="C">C</Radio>
      <Radio value="D" disabled>D</Radio>
    </RadioGroup>
  </Space>
</template>