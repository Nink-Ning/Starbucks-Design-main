<template>
  <div>
    <div style="marginBottom: 20px">
      <RadioGroup v-model="align" type="button">
        <Radio value="start">start</Radio>
        <Radio value="center">center</Radio>
        <Radio value="end">end</Radio>
        <Radio value="baseline">baseline</Radio>
      </RadioGroup>
    </div>
    <Space
      :align="align"
      style="backgroundColor: var(--color-fill-2);padding: 10px;"
    >
      <TypographyText>Space:</TypographyText>
      <Button type="primary">Item2</Button>
      <Card title="Card"> Card content </Card>
    </Space>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  align: 'center',
});

const { align } = toRefs(state);
</script>