<template>
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <Popconfirm content="This is a Popconfirm" position="tl">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="top">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="tr">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="bl">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="bottom">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="br">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="lt">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="left">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="lb">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="rt">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="right">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</Button
      >
    </Popconfirm>
    <Popconfirm content="This is a Popconfirm" position="rb">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</Button
      >
    </Popconfirm>
  </div>
</template>

<style scoped lang="less">
.button {
  width: 100px;
}
</style>