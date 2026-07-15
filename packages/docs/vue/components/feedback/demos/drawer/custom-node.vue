<template>
  <CheckboxGroup
    v-model="custom"
    :options="['hide header', 'hide footer', 'hide cancel']"
  />
  <div :style="{ marginTop: '20px' }">
    <Button type="primary" @click="handleClick">Open Drawer</Button>
  </div>
  <Drawer
    :width="340"
    :header="!custom.includes('hide header')"
    :footer="!custom.includes('hide footer')"
    :hide-cancel="custom.includes('hide cancel')"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #header>
      <span>Header and title</span>
    </template>
    <div>
      You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const custom = ref([]);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
</script>