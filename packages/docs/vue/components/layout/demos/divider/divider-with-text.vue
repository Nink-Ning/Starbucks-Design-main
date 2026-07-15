<template>
  <div class="divider-demo">
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
    <Divider orientation="left">Text</Divider>
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
    <Divider orientation="center">Text</Divider>
    <p
      >A design is a plan or specification for the construction of an object.</p
    >
    <Divider orientation="right">Text</Divider>
    <Divider :margin="10"><icon-star /></Divider>
  </div>
</template>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
</style>