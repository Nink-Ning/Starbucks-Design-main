<template>
  <div style="margin-bottom: 20px;">
    <TypographyText>折叠：</TypographyText>
    <Switch :checked="collapsed" @click="collapsed = !collapsed" />
  </div>
  <Grid
    :cols="3"
    :colGap="12"
    :rowGap="16"
    class="grid-demo-grid"
    :collapsed="collapsed"
  >
    <GridItem class="demo-item">item</GridItem>
    <GridItem class="demo-item">item</GridItem>
    <GridItem class="demo-item">item</GridItem>
    <GridItem class="demo-item" :offset="1">item | offset - 1</GridItem>
    <GridItem class="demo-item">item</GridItem>
    <GridItem class="demo-item" :span="3">item | span - 3</GridItem>
    <GridItem class="demo-item">item</GridItem>
    <GridItem class="demo-item">item</GridItem>
    <GridItem class="demo-item" suffix #="{ overflow }">
      suffix | overflow: {{ overflow }}
    </GridItem>
  </Grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const collapsed = ref(false);
</script>

<style scoped>
.grid-demo-grid .demo-item,
.grid-demo-grid .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>