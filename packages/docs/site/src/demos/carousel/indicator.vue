<template>
  <Space direction="vertical" size="large">
    <RadioGroup
      type="button"
      @change="handleUpdateType"
      style="{ marginBottom: '10px' }"
      :modelValue="indicatorType"
    >
      <Radio value="dot">dot</Radio>
      <Radio value="line">line</Radio>
      <Radio value="slider">slider</Radio>
    </RadioGroup>
    <RadioGroup
      type="button"
      @change="handleUpdatePosition"
      :style="{ marginBottom: '20px' }"
      :modelValue="indicatorPosition"
    >
      <Radio value="left">left</Radio>
      <Radio value="right">right</Radio>
      <Radio value="top">top</Radio>
      <Radio value="bottom">bottom</Radio>
      <Radio value="outer">outer</Radio>
    </RadioGroup>
    <Carousel
      :indicator-type="indicatorType"
      :indicator-position="indicatorPosition"
      show-arrow="never"
      :style="{
        width: '600px',
        height: '240px',
      }"
    >
      <CarouselItem v-for="image in images">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
      </CarouselItem>
    </Carousel>
  </Space>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  images: [
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  ],
  indicatorType: 'dot',
  indicatorPosition: 'bottom',
});

const { images, indicatorType, indicatorPosition } = toRefs(state);

const handleUpdateType = (type) => {
  indicatorType.value = type;
};

const handleUpdatePosition = (position) => {
  indicatorPosition.value = position;
};
</script>
