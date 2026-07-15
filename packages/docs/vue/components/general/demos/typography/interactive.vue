<template>
  <Typography>
    <TypographyParagraph copyable>
      Click the icon to copy this text.
    </TypographyParagraph>
    <TypographyParagraph editable v-model:editText="str">
      {{ str }}
    </TypographyParagraph>
  </Typography>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const str = ref('Click the icon to edit this text.');
</script>