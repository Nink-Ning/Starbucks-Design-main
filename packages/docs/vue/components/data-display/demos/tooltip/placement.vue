<template>
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <Tooltip content="This is a Tooltip" position="tl">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="top">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="tr">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="bl">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="bottom">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="br">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="lt">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="left">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="lb">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="rt">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="right">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</Button
      >
    </Tooltip>
    <Tooltip content="This is a Tooltip" position="rb">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</Button
      >
    </Tooltip>
  </div>
</template>

<style scoped>
.button {
  width: 100px;
}
</style>