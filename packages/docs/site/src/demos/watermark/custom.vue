<template>
  <Form size="small" :model="form" auto-label-width>
    <Row :gutter="16">
      <Col :span="24">
        <FormItem field="rotate" label="rotate">
          <Slider v-model="form.rotate" :min="-180" :max="180" />
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="gap">
          <InputGroup>
            <InputNumber
              v-model="form.gap[0]"
              placeholder="gap[x]"
              :min="0"
            />
            <InputNumber
              v-model="form.gap[1]"
              placeholder="gap[y]"
              :min="0"
            />
          </InputGroup>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="offset">
          <InputGroup>
            <InputNumber v-model="form.offset[0]" placeholder="offsetLeft" />
            <InputNumber v-model="form.offset[1]" placeholder="offsetTop" />
          </InputGroup>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="fontSize">
          <InputNumber v-model="form.font.fontSize" mode="button" />
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="zIndex">
          <InputNumber v-model="form.zIndex" mode="button" />
        </FormItem>
      </Col>
      <Col :span="6">
        <FormItem label="repeat">
          <Switch v-model="form.repeat" />
        </FormItem>
      </Col>
      <Col :span="6">
        <FormItem label="staggered">
          <Switch v-model="form.staggered" />
        </FormItem>
      </Col>
    </Row>
  </Form>
  <Watermark content="arco.design" v-bind="form">
    <div style="width: 100%; border: 1px solid #e5e6eb; box-sizing: border-box">
      <TypographyTitle :heading="5"> Design system </TypographyTitle>
      <Typography>
        <TypographyParagraph>
          A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process. The verb to design expresses the process of
          developing a design.
        </TypographyParagraph>
        <TypographyParagraph>
          A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process. The verb to design expresses the process of
          developing a design.
        </TypographyParagraph>
      </Typography>
      <img
        style="position: relative; z-index: 7"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp"
      />
    </div>
  </Watermark>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  rotate: 0,
  gap: [50, 50],
  offset: [],
  font: { fontSize: 16 },
  zIndex: 6,
  repeat: true,
  staggered: true,
});
</script>
