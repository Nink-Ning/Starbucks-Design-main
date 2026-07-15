<template>
  <List
    :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
    :data="dataSource"
    :bordered="false"
  >
    <template #item="{ item }">
      <List :data="item.data">
        <template #header>{{ item.title }}</template>
        <template #item="{ item: subItem }">
          <ListItem>{{ subItem }}</ListItem>
        </template>
      </List>
    </template>
  </List>
</template>

<script setup lang="ts">
const dataSource = [
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
  {
    title: 'Component',
    data: ['Button', 'Breadcrumb', 'Transfer'],
  },
  {
    title: 'Design',
    data: ['Figma', 'Sketch', 'Adobe XD'],
  },
  {
    title: 'Plugin',
    data: ['Edu Tools', 'BashSupport', 'GitToolBox'],
  },
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
];
</script>