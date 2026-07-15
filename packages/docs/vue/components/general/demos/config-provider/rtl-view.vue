<template>
  <div>
    <Switch v-model="rtlType" style="margin-bottom: 20px;">
      <template #checked> RTL </template>
      <template #unchecked> LTR </template>
    </Switch>
    <ConfigProvider :rtl="rtlType">
      <Tabs :default-active-key="2" style="margin-bottom: 20px;">
        <TabPane v-for="i in 36" :key="i" :title="`Tab ${i}`">
          Content of Tab Panel {{ i }}
        </TabPane>
      </Tabs>
      <Space :direction="'vertical'" style="width: 100%;">
        <Space :size="40">
          <Badge :count="9">
            <Avatar shape="square" />
          </Badge>
          <Badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
            <Avatar shape="square" />
          </Badge>
          <Badge
            :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }"
          >
            <template #content>
              <IconClockCircle
                :style="{
                  verticalAlign: 'middle',
                  color: 'var(--color-text-2)',
                }"
              />
            </template>
            <Avatar shape="square" />
          </Badge>
          <Tag :color="'red'" closable>red</Tag>
          <Tag :color="'blue'" closable>blue</Tag>
          <Tag :color="'green'" closable>green</Tag>
        </Space>
      </Space>
    </ConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rtlType = ref(true);
</script>