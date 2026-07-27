<template>
  <div class="menu-demo">
    <Trigger
      :trigger="['click', 'hover']"
      clickToClose
      position="top"
      v-model:popupVisible="popupVisible1"
    >
      <div
        :class="`button-trigger ${
          popupVisible1 ? 'button-trigger-active' : ''
        }`"
      >
        <IconClose v-if="popupVisible1" />
        <IconMessage v-else />
      </div>
      <template #content>
        <Menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <MenuItem key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </MenuItem>
          <MenuItem key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </MenuItem>
        </Menu>
      </template>
    </Trigger>

    <Trigger
      :trigger="['click', 'hover']"
      clickToClose
      position="top"
      v-model:popupVisible="popupVisible2"
    >
      <div
        :class="`button-trigger ${
          popupVisible2 ? 'button-trigger-active' : ''
        }`"
      >
        <IconClose v-if="popupVisible2" />
        <IconMessage v-else />
      </div>
      <template #content>
        <Menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <MenuItem key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </MenuItem>
          <MenuItem key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </MenuItem>
        </Menu>
      </template>
    </Trigger>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import {
  IconBug,
  IconBulb,
  IconClose,
  IconMessage,
} from '@sbux/starbucks-design-vue/icon';

const state = reactive({
  popupVisible1: false,
  popupVisible2: false,
});

const { popupVisible1, popupVisible2 } = toRefs(state);
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 660px;
  height: 300px;
  padding: 40px;
  background-color: var(--color-fill-2);
  position: relative;
}
.button-trigger {
  position: absolute;
  bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
}
/* button left */
.button-trigger:nth-child(1) {
  left: 150px;
  background-color: var(--color-neutral-5);
}
.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
}
/* button right */
.button-trigger:nth-child(2) {
  left: 372px;
  background-color: rgb(var(--arcoblue-6));
}
.button-trigger:nth-child(3).button-trigger-active {
  background-color: var(--color-primary-light-4);
}
</style>
