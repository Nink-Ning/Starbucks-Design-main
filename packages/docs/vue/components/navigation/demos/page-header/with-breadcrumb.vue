<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }">
    <PageHeader
      :style="{ background: 'var(--color-bg-2)' }"
      title="ArcoDesign"
      subtitle="ArcoDesign Vue 2.0"
      :show-back="false"
    >
      <template #breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Channel</BreadcrumbItem>
          <BreadcrumbItem>News</BreadcrumbItem>
        </Breadcrumb>
      </template>
      <template #extra>
        <RadioGroup type="button" default-value="large">
          <Radio value="mini">Mini</Radio>
          <Radio value="small">Small</Radio>
          <Radio value="large">Large</Radio>
        </RadioGroup>
      </template>
    </PageHeader>
  </div>
</template>