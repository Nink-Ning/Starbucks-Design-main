<template>
  <div class="frame-bg">
    <div class="frame-body">
      <div class="frame-aside">
        <Steps :current="current" direction="vertical">
          <Step>Succeeded</Step>
          <Step>Processing</Step>
          <Step>Pending</Step>
        </Steps>
      </div>
      <div class="frame-main">
        <div class="main-content">The content of this step.</div>
        <div class="main-bottom">
          <Button :disabled="current === 1" @click="handlePrev">
            <icon-left />
            Back
          </Button>
          <Button :disabled="current === 3" @click="handleNext">
            Next
            <icon-right />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconLeft, IconRight } from '@sbux/starbucks-design-vue/icon';

const current = ref(1);

const handlePrev = () => {
  current.value = Math.max(1, current.value - 1);
};

const handleNext = () => {
  current.value = Math.min(3, current.value + 1);
};
</script>

<style scoped>
.frame-bg {
  max-width: 780px;
  padding: 40px;
  background: var(--color-fill-2);
}

.frame-body {
  display: flex;
  background: var(--color-bg-2);
}

.frame-aside {
  padding: 24px;
  height: 272px;
  border-right: 1px solid var(--color-border);
}

.frame-main {
  width: 100%;
}

.main-content {
  text-align: center;
  line-height: 200px;
}

.main-bottom {
  display: flex;
  justify-content: center;
}

.main-bottom button {
  margin: 0 20px;
}
</style>
