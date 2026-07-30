<template>
  <Form size="small" :model="form" auto-label-width>
    <Row :gutter="16">
      <Col :span="24">
        <FormItem field="content" label="content">
          <Input v-model="form.content" />
        </FormItem>
      </Col>
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
  <Watermark v-bind="form">
    <div style="width: 100%; border: 1px solid var(--color-border-2); box-sizing: border-box; padding: 24px;">
      <TypographyTitle :heading="5">
        让设计经验，成为 AI 可执行的组织能力
      </TypographyTitle>
      <Typography>
        <TypographyParagraph>
          DesignKit 将企业设计语言、业务知识、工程资产和设计决策连接成一条智能生成链路，
          让产品、设计、研发与 AI 基于统一标准协作。
        </TypographyParagraph>
        <TypographyParagraph>
          不是让 AI 随机拼装页面，而是让 AI 在企业标准内工作：设计规格、业务语境、
          页面模板、组件资产和质量检查共同构成可验证的交付链路。
        </TypographyParagraph>
      </Typography>
      <div style="position: relative; z-index: 7; display: grid; gap: 12px; max-width: 560px;">
        <div
          v-for="item in runtimeItems"
          :key="item.index"
          style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(0, 120, 84, 0.18); background: rgba(255, 255, 255, 0.72);"
        >
          <span style="width: 32px; height: 32px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; color: var(--color-primary); background: var(--color-primary-light); font-weight: 700;">
            {{ item.index }}
          </span>
          <span style="flex: 1;">
            <TypographyText bold>{{ item.title }}</TypographyText>
            <br />
            <TypographyText type="secondary">{{ item.desc }}</TypographyText>
          </span>
          <TypographyText bold style="color: var(--color-primary);">
            {{ item.status }}
          </TypographyText>
        </div>
      </div>
    </div>
  </Watermark>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  content: 'Starbucks DesignKit',
  rotate: 0,
  gap: [50, 50],
  offset: [],
  font: { fontSize: 16, color: 'rgba(0,120,84,0.12)' },
  zIndex: 6,
  repeat: true,
  staggered: true,
});

const runtimeItems = [
  {
    index: '01',
    title: 'Design Spec',
    desc: '需求结构与验收条件已加载',
    status: 'LOADED',
  },
  {
    index: '02',
    title: 'Domain Context',
    desc: '企业业务语义与规则已匹配',
    status: 'MATCHED',
  },
  {
    index: '03',
    title: 'Template + Components',
    desc: '页面骨架与现有资产已解析',
    status: 'RESOLVED',
  },
  {
    index: '04',
    title: 'Evaluator',
    desc: '结构、视觉、行为与规则检查就绪',
    status: 'READY',
  },
];
</script>
