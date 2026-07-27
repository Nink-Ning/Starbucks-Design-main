<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }">
    <PageHeader
      :style="{ background: 'var(--color-bg-2)' }"
      title="Starbucks"
    >
      <template #breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Channel</BreadcrumbItem>
          <BreadcrumbItem>News</BreadcrumbItem>
        </Breadcrumb>
      </template>
      <template #subtitle>
        <Space>
          <span>Starbucks Vue 2.0</span>
          <Tag color="red" size="small">Default</Tag>
        </Space>
      </template>
      <template #extra>
        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Save</Button>
        </Space>
      </template>
      <p> For other uses, see Design </p>
      <p>
        A design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a prototype, product
        or process. The verb to design expresses the process of developing a
        design. In some cases, the direct construction of an object without an
        explicit prior plan (such as in craftwork, some engineering, coding, and
        graphic design) may also be considered to be a design activity. The
        design usually has to satisfy certain goals and constraints, may take
        into account aesthetic, functional, economic, or socio-political
        considerations, and is expected to interact with a certain environment.
        Major examples of designs include architectural blueprints,engineering
        drawings, business processes, circuit diagrams, and sewing
        patterns.Major examples of designs include architectural
        blueprints,engineering drawings, business processes, circuit diagrams,
        and sewing patterns.
      </p>
    </PageHeader>
  </div>
</template>

<script setup lang="ts"></script>
