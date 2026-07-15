<template>
  <CheckboxGroup v-model="checkedValue">
    <Grid :cols="3" :colGap="24" :rowGap="16">
      <GridItem>
        <Checkbox value="1">Option 1</Checkbox>
      </GridItem>
      <GridItem>
        <Checkbox value="2" disabled>Option 2</Checkbox>
      </GridItem>
      <GridItem>
        <Checkbox value="3">Option 3</Checkbox>
      </GridItem>
      <GridItem>
        <Checkbox value="4">Option 4</Checkbox>
      </GridItem>
      <GridItem>
        <Checkbox value="5">Option 5</Checkbox>
      </GridItem>
    </Grid>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checkedValue = ref(['1', '2']);
</script>