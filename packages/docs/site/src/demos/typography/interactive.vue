<template>
  <Typography>
    <TypographyParagraph copyable>
      点击复制图标，复制 Starbucks Design 文案。
    </TypographyParagraph>
    <TypographyParagraph editable v-model:editText="str">
      {{ str }}
    </TypographyParagraph>
  </Typography>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const str = ref('点击编辑图标，更新门店公告内容。');
</script>
