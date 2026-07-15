<template>
  <Row>
    <Col :flex="1">
      <Countdown
        title="Countdown"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
      />
    </Col>
    <Col :flex="1">
      <Countdown
        title="Milliseconds"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
        format="HH:mm:ss.SSS"
      />
    </Col>
    <Col :flex="1">
      <Countdown
        title="Days"
        :value="now + 1000 * 60 * 60 * 24 * 4"
        :now="now"
        format="D 天 H 时 m 分 s 秒"
      />
    </Col>
  </Row>
  <Space direction="vertical" style="margin-top: 10px">
    <Countdown
      title="Trigger on finish"
      :value="Date.now() + 5 * 1000"
      format="mm:ss.SSS"
      :now="Date.now()"
      :start="start"
      @finish="handleFinish"
    />
    <Button @click="start = true" type="primary">Start</Button>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const now = Date.now();
const start = ref(false);

const handleFinish = () => {
  Message.info('Finish');
};
</script>