<template>
  <Spin :loading="loading" tip="This may take a while...">
    <Card title="Arco Card">
      ByteDance's core product, Toutiao ('Headlines'), is a content platform in
      China and around the world. Toutiao started out as a news recommendation
      engine and gradually evolved into a platform delivering content in various
      formats.
    </Card>
  </Spin>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  loading: true,
});

const { loading } = toRefs(state);
</script>
