<template>
  <Form :model="form" auto-label-width>
    <FormItem label="size">
      <RadioGroup v-model="form.size" type="button" :options="sizeOptions" />
    </FormItem>

    <FormItem label="layout">
      <RadioGroup
        v-model="form.layout"
        type="button"
        :options="layoutOptions"
      />
    </FormItem>

    <FormItem label="table-layout">
      <RadioGroup
        v-model="form.tableLayout"
        type="button"
        :options="['auto', 'fixed']"
      />
    </FormItem>

    <FormItem label="column">
      <RadioGroup
        v-model="form.column"
        type="button"
        :options="columnOptions"
      />
    </FormItem>

    <FormItem label="firstSpan">
      <RadioGroup
        v-model="form.firstSpan"
        type="button"
        :options="firstSpanOptions"
      />
    </FormItem>
  </Form>
  <div style="margin-top: 20px">
    <Descriptions
      title="Layout Example"
      :size="form.size"
      :column="form.column"
      :layout="form.layout"
      :table-layout="form.tableLayout"
      bordered
    >
      <DescriptionsItem label="Item1" :span="form.firstSpan">
        <div
          >Span：{{ form.firstSpan }}
          <span v-if="form.firstSpan > form.column" style="color: red;">
            Exceeds Column, set to Column size
          </span>
        </div>
      </DescriptionsItem>
      <DescriptionsItem label="Item2" :span="2">Span：2</DescriptionsItem>
      <DescriptionsItem label="Item3" :span="3">Span：3</DescriptionsItem>
      <DescriptionsItem label="Item4" :span="2">Span：2</DescriptionsItem>
      <DescriptionsItem label="Item5" :span="1">Span：1</DescriptionsItem>
      <DescriptionsItem label="Item6" :span="1">Span：1</DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  size: 'medium',
  layout: 'horizontal',
  column: 4,
  tableLayout: 'auto',
  firstSpan: 2,
});

const layoutOptions = [
  'horizontal',
  'inline-horizontal',
  'vertical',
  'inline-vertical',
];
const columnOptions = [1, 2, 3, 4, 5];
const firstSpanOptions = [1, 2, 3, 4, 5];
const sizeOptions = ['mini', 'small', 'medium', 'large'];
</script>