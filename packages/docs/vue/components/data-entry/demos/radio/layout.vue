<template>
  <RadioGroup v-model="checkedValue">
    <Grid :cols="3" :colGap="24" :rowGap="16">
      <GridItem>
        <Radio value="1">Option 1</Radio>
      </GridItem>
      <GridItem>
        <Radio value="2" disabled>Option 2</Radio>
      </GridItem>
      <GridItem>
        <Radio value="3">Option 3</Radio>
      </GridItem>
      <GridItem>
        <Radio value="4">Option 4</Radio>
      </GridItem>
      <GridItem>
        <Radio value="5">Option 5</Radio>
      </GridItem>
    </Grid>
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checkedValue = ref('1');
</script>