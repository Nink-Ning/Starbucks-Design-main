<template>
  <div class="menu-demo">
    <Menu mode="horizontal" theme="dark" :default-selected-keys="['1']">
      <MenuItem
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div
          :style="{
            width: '80px',
            height: '30px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
        />
      </MenuItem>
      <MenuItem key="1">Home</MenuItem>
      <MenuItem key="2">Solution</MenuItem>
      <MenuItem key="3">Cloud Service</MenuItem>
      <MenuItem key="4">Cooperation</MenuItem>
    </Menu>
  </div>
</template>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>