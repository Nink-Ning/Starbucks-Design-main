<template>
  <div style="margin-bottom: 20px">
    <RadioGroup type="button" default-value="large">
      <Radio value="mini">Mini</Radio>
      <Radio value="small">Small</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
  </div>
  <div
    :style="{
      backgroundImage:
        'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
      backgroundSize: '16px 16px',
      padding: '28px',
    }"
  >
    <PageHeader title="Starbucks" subtitle="Starbucks Vue 2.0">
      <template #breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Channel</BreadcrumbItem>
          <BreadcrumbItem>News</BreadcrumbItem>
        </Breadcrumb>
      </template>
    </PageHeader>
  </div>
</template>
