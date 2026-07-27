<template>
  <div class="wrapper">
    <ul id="custom-demo">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <BackTop
      target-container="#custom-demo"
      :style="{ position: 'absolute' }"
    >
      <Button>UP</Button>
    </BackTop>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.wrapper ul {
  height: 200px;
  overflow-y: auto;
}

.wrapper ul li {
  line-height: 30px;
}
</style>
