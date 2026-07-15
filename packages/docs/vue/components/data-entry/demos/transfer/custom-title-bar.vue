<template>
  <Transfer :data="data" :default-value="value">
    <template
      #source-title="{
        countTotal,
        countSelected,
        checked,
        indeterminate,
        handleSelectAllChange,
      }"
    >
      <div :style="styleHeader">
        Source Title {{ countSelected }}-{{ countTotal }}
        <Checkbox
          :model-value="checked"
          :indeterminate="indeterminate"
          @change="handleSelectAllChange"
        />
      </div>
    </template>

    <template #target-title="{ countTotal, countSelected, handleClear }">
      <div :style="styleHeader">
        Target Title {{ countSelected }}-{{ countTotal }}
        <IconDelete @click="handleClear" />
      </div>
    </template>
  </Transfer>
</template>

<script setup lang="ts">
import { IconDelete } from '@arco-design/web-vue/es/icon';

const data = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: `option${index + 1}`,
    label: `Option ${index + 1}`,
  }));
const value = ['option1', 'option3', 'option5'];

const styleHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: '8px',
};
</script>