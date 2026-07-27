<template>
  <Image
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    title="A user’s avatar"
    description="Present by Arco Design"
    width="260"
    style="margin-right: 67px; vertical-align: top;"
    :preview-visible="visible1"
    @preview-visible-change="
      () => {
        visible1 = false;
      }
    "
  >
    <template #extra>
      <div class="actions">
        <span
          class="action"
          @click="
            () => {
              visible1 = true;
            }
          "
          ><icon-eye
        /></span>
        <span class="action" @click="handleDownLoad"><icon-download /></span>
        <Tooltip content="A user’s avatar">
          <span class="action"><icon-info-circle /></span>
        </Tooltip>
      </div>
    </template>
  </Image>
  <Image
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    title="A user’s avatar"
    description="Present by Arco Design"
    width="260"
    footer-position="outer"
    :preview-visible="visible2"
    @preview-visible-change="
      () => {
        visible2 = false;
      }
    "
  >
    <template #extra>
      <div class="actions actions-outer">
        <span
          class="action"
          @click="
            () => {
              visible2 = true;
            }
          "
          ><icon-eye
        /></span>
        <span class="action" @click="handleDownLoad"><icon-download /></span>
        <Tooltip content="A user’s avatar">
          <span class="action"><icon-info-circle /></span>
        </Tooltip>
      </div>
    </template>
  </Image>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  IconEye,
  IconDownload,
  IconInfoCircle,
} from '@sbux/starbucks-design-vue/icon';

const visible1 = ref(false);
const visible2 = ref(false);
</script>
<style scoped>
.actions {
  display: flex;
  align-items: center;
}
.action {
  padding: 5px 4px;
  font-size: 14px;
  margin-left: 12px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
}
.action:first-child {
  margin-left: 0;
}

.action:hover {
  background: rgba(0, 0, 0, 0.5);
}
.actions-outer .action:hover {
  color: #ffffff;
}
</style>
