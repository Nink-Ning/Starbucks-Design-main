<template>
  <div class="divider-demo">
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
    <Divider />
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
    <Divider dashed />
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
    <Divider :size="2" style="border-bottom-style: dotted" />
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
  </div>
  <div class="divider-demo" style="marginTop: 48px">
    <div class="flex-box">
      <span class="avatar"><IconImage /></span>
      <div class="content">
        <TypographyTitle :heading="6">Image</TypographyTitle>
        May 4, 2010
      </div>
    </div>
    <Divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconUser /></span>
      <div class="content">
        <TypographyTitle :heading="6">Avatar</TypographyTitle>
        May 4, 2010
      </div>
    </div>
    <Divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconPen /></span>
      <div class="content">
        <TypographyTitle :heading="6">Icon</TypographyTitle>
        May 4, 2010
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconImage,
  IconUser,
  IconPen,
} from '@sbux/starbucks-design-vue/icon';
</script>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
.half-divider {
  left: 55px;
  width: calc(100% - 55px);
  min-width: auto;
  margin: 16px 0;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: var(--color-text-2);
  font-size: 16px;
  background-color: var(--color-fill-3);
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 20px;
}
</style>
