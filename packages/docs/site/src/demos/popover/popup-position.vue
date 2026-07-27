<template>
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <Popover position="tl">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="top">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="tr">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="bl">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="bottom">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="br">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="lt">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="left">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="lb">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="rt">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="right">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover position="rb">
      <Button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</Button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
  </div>
</template>

<style scoped>
.button {
  width: 100px;
}
</style>
