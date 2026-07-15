<template>
  <Rate :default-value="2">
    <template #character="{ index }">
      <icon-check v-if="index < 3" />
      <icon-close v-else />
    </template>
  </Rate>
</template>