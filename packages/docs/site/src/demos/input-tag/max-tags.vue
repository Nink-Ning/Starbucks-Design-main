<template>
  <InputTag
    :default-value="['one', 'two', 'three', 'four']"
    :style="{ width: '380px' }"
    placeholder="Please Enter"
    :max-tag-count="3"
    allow-clear
  />
</template>
