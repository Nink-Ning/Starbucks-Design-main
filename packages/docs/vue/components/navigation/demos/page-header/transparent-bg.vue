<template>
  <div
    :style="{
      backgroundImage:
        'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
      backgroundSize: '16px 16px',
      padding: '28px',
    }"
  >
    <PageHeader title="ArcoDesign" subtitle="ArcoDesign Vue 2.0">
      <template #breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Channel</BreadcrumbItem>
          <BreadcrumbItem>News</BreadcrumbItem>
        </Breadcrumb>
      </template>
      <template #extra>
        <RadioGroup type="button">
          <Radio value="mini">Mini</Radio>
          <Radio value="small">Small</Radio>
          <Radio value="large">Large</Radio>
        </RadioGroup>
      </template>
    </PageHeader>
  </div>
</template>