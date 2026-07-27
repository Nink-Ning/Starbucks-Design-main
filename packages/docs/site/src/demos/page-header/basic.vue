<template>
  <div style="margin-bottom: 20px">
    <RadioGroup type="button" default-value="large">
      <Radio value="mini">Mini</Radio>
      <Radio value="small">Small</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
  </div>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }">
    <PageHeader
      :style="{ background: 'var(--color-bg-2)' }"
      title="Starbucks"
      subtitle="Starbucks Vue 2.0"
    />
  </div>
</template>
